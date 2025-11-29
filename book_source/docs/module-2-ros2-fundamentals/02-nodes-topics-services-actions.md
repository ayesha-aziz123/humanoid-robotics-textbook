---
title: "Nodes, Topics, Services, and Actions in ROS 2"
sidebar_position: 2
---

# Nodes, Topics, Services, and Actions in ROS 2

## Learning Objectives
*   Elaborate on the roles and interactions of ROS 2 nodes in a distributed system.
*   Understand the publish/subscribe communication model using topics and custom messages.
*   Implement synchronous request/reply communication using ROS 2 services.
*   Develop and utilize ROS 2 actions for asynchronous, long-duration tasks.
*   Create simple ROS 2 nodes for publishers, subscribers, service servers, and service clients.

## Comprehensive Content

In ROS 2, the computational graph is built upon several fundamental communication primitives: nodes, topics, services, and actions. These primitives allow individual software components to communicate and coordinate, forming complex robotic behaviors. Understanding how to effectively use each of these is crucial for developing robust and scalable ROS 2 applications.

### ROS 2 Nodes

**Definition**: A node is an executable program that uses the ROS 2 client libraries (`rclcpp` for C++ or `rclpy` for Python) to communicate with other nodes. Each node should be responsible for a single, modular purpose (e.g., a camera driver, a motor controller, a path planner).

**Key Characteristics**:
*   **Modularity**: Nodes break down complex systems into manageable components.
*   **Independence**: Nodes run as separate processes, allowing for fault isolation and parallel execution.
*   **Communication**: Nodes interact via topics, services, and actions.
*   **Lifecycles**: Nodes can have managed lifecycles (configured, activated, deactivated, finalized) for more robust system behavior.

**Example: Minimal Node (Python)**
```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### ROS 2 Topics (Publish/Subscribe)

**Definition**: Topics implement a publish/subscribe communication model, ideal for streaming data that doesn't require a direct response. A node *publishes* messages to a named topic, and any number of other nodes can *subscribe* to that topic to receive the messages.

**Key Characteristics**:
*   **Asynchronous**: Publishers and subscribers don't need to be aware of each other directly.
*   **Many-to-Many**: Multiple publishers can write to a topic, and multiple subscribers can read from it.
*   **Data Streams**: Best for continuous flows of data like sensor readings (camera images, LiDAR scans), odometry, or joint states.
*   **Messages**: Data is encapsulated in predefined message types (e.g., `sensor_msgs/msg/Image`, `std_msgs/msg/String`).

**Example: Publishing to a Topic (Python - as above)**
`self.publisher_ = self.create_publisher(String, 'topic', 10)` creates a publisher to a topic named `topic` of type `std_msgs/String` with a queue size of 10.

**Example: Subscribing to a Topic (Python)**
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### ROS 2 Services (Request/Reply)

**Definition**: Services implement a synchronous request/reply communication model. A client node sends a request to a service server node and waits for a response. This is suitable for operations that involve a single request and a single, immediate response.

**Key Characteristics**:
*   **Synchronous**: The client typically blocks until a response is received.
*   **One-to-One**: One client makes a request to one service server.
*   **Actionable Tasks**: Best for discrete, command-like operations (e.g., "get current robot pose," "start recording data," "turn on/off a light").
*   **Service Messages**: Defined by a request type and a response type.

**Example: Service Definition (`AddTwoInts.srv`)**
```
int64 a
int64 b
---
int64 sum
```

**Example: Service Server (Python)**
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request: a: %d b: %d' % (request.a, request.b))
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Example: Service Client (Python)**
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalClientAsync(Node):
    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClientAsync()
    response = minimal_client.send_request(4, 5)
    minimal_client.get_logger().info(
        'Result of add_two_ints: for %d + %d = %d' % (minimal_client.req.a, minimal_client.req.b, response.sum))
    minimal_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### ROS 2 Actions (Goal/Feedback/Result)

**Definition**: Actions provide a more complex communication pattern, building upon topics and services. They are designed for long-running, interruptible tasks where a client needs to send a goal, receive periodic feedback on its progress, and eventually get a final result. The client can also cancel the goal.

**Key Characteristics**:
*   **Asynchronous Goal-Oriented**: Client sends a goal and continues execution.
*   **Feedback**: Server provides continuous updates on task progress.
*   **Result**: Server sends a final result upon completion.
*   **Cancelable**: Client can request to cancel the active goal.
*   **Action Messages**: Comprise a goal, result, and feedback definition.

**Example: Action Definition (`Fibonacci.action`)**
```
int32 order
---
int32[] sequence
---
int32[] partial_sequence
```

**Example: Action Server (Python - simplified)**
```python
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from example_interfaces.action import Fibonacci

class MinimalActionServer(Node):
    def __init__(self):
        super().__init__('minimal_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        sequence = [0, 1]
        for i in range(1, goal_handle.request.order):
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled')
                return Fibonacci.Result()
            sequence.append(sequence[i] + sequence[i-1])
            feedback_msg = Fibonacci.Feedback()
            feedback_msg.partial_sequence = sequence
            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info('Feedback: {0}'.format(feedback_msg.partial_sequence))

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = sequence
        self.get_logger().info('Goal succeeded')
        return result

def main(args=None):
    rclpy.init(args=args)
    minimal_action_server = MinimalActionServer()
    rclpy.spin(minimal_action_server)
    minimal_action_server.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Practical Exercises

### Exercise 1: Implement a Simple ROS 2 Publisher-Subscriber Pair
**Objective**: To create two ROS 2 nodes, one publishing a custom string message and another subscribing and printing it.

**Instructions**:
1.  **Create a ROS 2 package**: If you haven't already, create a Python package named `my_talk_listen_pkg` in your workspace (`~/ros2_ws/src`).
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_python my_talk_listen_pkg
    ```
2.  **Publisher Node**: Inside `my_talk_listen_pkg/my_talk_listen_pkg/`, create `talker.py` that publishes a `std_msgs/String` message to a topic named `/my_chat`. The message should contain "Hello from my custom publisher!" followed by a counter, every 1 second.
3.  **Subscriber Node**: Create `listener.py` in the same directory that subscribes to `/my_chat` and prints the received message.
4.  **Update `setup.py`**: Add entry points for both `talker.py` and `listener.py` in `my_talk_listen_pkg/setup.py`.
5.  **Build and Run**: Build your workspace (`colcon build`) and then run both nodes in separate terminals, ensuring you source the workspace setup files.

**Expected Output**:
*   The publisher node terminal showing "Publishing: 'Hello from my custom publisher! X'" messages.
*   The subscriber node terminal showing "I heard: 'Hello from my custom publisher! X'" messages, where X is the increasing counter.

### Exercise 2: ROS 2 Service Client-Server Interaction
**Objective**: To implement a ROS 2 service server and client for a simple mathematical operation.

**Instructions**:
1.  **Define a Service**: In your `my_talk_listen_pkg` (or a new package), define a service `MultiplyTwoInts.srv`:
    ```
    int64 a
    int64 b
    ---
    int64 product
    ```
    Ensure you modify `CMakeLists.txt` and `package.xml` to build this service (refer to ROS 2 documentation for custom interface building).
2.  **Service Server Node**: Create `multiplier_server.py` that implements the `MultiplyTwoInts` service. When called, it should multiply the two integers and return the product.
3.  **Service Client Node**: Create `multiplier_client.py` that calls the `MultiplyTwoInts` service with two numbers (e.g., 7 and 8) and prints the returned product.
4.  **Build and Run**: Build your workspace. Run the server node in one terminal and the client node in another. The client should make a request, print the result, and then exit.

**Expected Output**:
*   The server terminal showing "Incoming request: a: 7 b: 8" (or your chosen numbers).
*   The client terminal showing "Result of multiply_two_ints: for 7 * 8 = 56" (or your calculated product).

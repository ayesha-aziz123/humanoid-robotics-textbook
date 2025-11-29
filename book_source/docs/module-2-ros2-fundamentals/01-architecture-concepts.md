---
title: "ROS 2 Architecture and Core Concepts"
sidebar_position: 1
---

# ROS 2 Architecture and Core Concepts

## Learning Objectives
*   Explain the fundamental architecture of ROS 2 and its distributed nature.
*   Identify and describe core ROS 2 concepts such as computational graph and DDS.
*   Differentiate between ROS 1 and ROS 2 key design choices and improvements.
*   Understand the purpose of the `ros2` command-line tools for interaction and introspection.
*   Set up a basic ROS 2 workspace and create a simple package.

## Comprehensive Content

The Robot Operating System (ROS) has become a de facto standard for robotics software development. ROS 2 is the next generation of ROS, redesigned to meet the demands of modern robotics applications, including improved real-time capabilities, security, and support for a wider range of platforms. It provides a flexible framework that facilitates the development of complex robot behaviors by promoting modularity and reusability of software components.

### What is ROS 2?
ROS 2 is a set of software libraries and tools that help you build robot applications. From drivers to state-of-the-art algorithms, and with powerful developer tools, ROS has everything you need for your next robotics project. ROS 2 builds upon the success of ROS 1, but with a fundamentally re-architected core to address limitations in areas like real-time performance, multi-robot systems, and security.

### Key Design Goals of ROS 2
*   **Support for Multiple RTOS (Real-Time Operating Systems)**: Enables deterministic behavior crucial for industrial and safety-critical applications.
*   **Multi-Robot Systems**: Designed for easier deployment and management of fleets of robots.
*   **Improved Security**: Provides mechanisms for authentication, encryption, and access control.
*   **Quality of Service (QoS)**: Allows developers to configure communication reliability, latency, and throughput.
*   **Distributed Nature**: Leverages Data Distribution Service (DDS) for peer-to-peer communication without a central master.

### ROS 2 Core Concepts

#### 1. Computational Graph
The computational graph in ROS 2 refers to the network of ROS 2 elements processing data. This graph comprises:
*   **Nodes**: Executables that perform computations. A robot system typically consists of many nodes, each responsible for a specific task (e.g., controlling a motor, processing camera data, planning a path).
*   **Topics**: Named buses over which nodes exchange messages. Topics are a publish/subscribe communication model, where one node publishes messages to a topic, and other nodes subscribe to receive messages from that topic.
*   **Services**: A request/reply communication model. A service allows a client node to send a request to a service server node and receive a response. This is typically used for synchronous, blocking operations.
*   **Actions**: A long-running request/feedback/result communication model. Actions are suitable for tasks that take a long time to complete and for which the client might want periodic feedback and the ability to cancel the request. They build upon topics and services.
*   **Parameters**: Configuration values for nodes. Nodes can expose parameters that can be changed at runtime or loaded from files.

#### 2. Data Distribution Service (DDS)
At the heart of ROS 2's communication layer is the Data Distribution Service (DDS). DDS is an international standard for real-time, scalable, and high-performance data exchange in distributed systems. Key features of DDS in ROS 2 include:
*   **Decentralized Communication**: Unlike ROS 1's master-slave architecture, DDS enables direct peer-to-peer communication between nodes. This enhances robustness and scalability.
*   **Discovery**: Nodes automatically discover each other without needing a central server.
*   **Quality of Service (QoS)**: DDS provides a rich set of QoS policies that allow developers to fine-tune communication characteristics (e.g., reliability, history, deadline, liveliness) to match application requirements.
*   **Interoperability**: Different DDS implementations can communicate with each other, allowing for greater flexibility.

### ROS 1 vs. ROS 2: Key Differences

| Feature           | ROS 1                                   | ROS 2                                            |
| :---------------- | :-------------------------------------- | :----------------------------------------------- |
| **Communication** | ROS Master (central server)             | DDS (decentralized, peer-to-peer)                |
| **Real-Time**     | Limited, not designed for real-time     | Improved real-time capabilities, QoS             |
| **Multi-Robot**   | Challenging, name collisions            | Designed for multi-robot systems                 |
| **Security**      | Minimal out-of-the-box                  | Integrated security (authentication, encryption) |
| **Supported OS**  | Linux (primarily)                       | Linux, Windows, macOS, RTOS                      |
| **API Language**  | C++, Python (rospy, roscpp)             | C++, Python (rclpy, rclcpp)                      |

### `ros2` Command-Line Tools
ROS 2 provides a powerful set of command-line tools for interacting with and introspecting a running ROS 2 system. These tools are prefixed with `ros2`.

*   `ros2 run <package_name> <executable_name>`: Run an executable from a ROS 2 package.
*   `ros2 topic list`: List active topics.
*   `ros2 topic echo <topic_name>`: Display messages published on a topic.
*   `ros2 node list`: List active nodes.
*   `ros2 service list`: List active services.
*   `ros2 param list`: List parameters of a node.
*   `ros2 interface show <msg/srv/action>`: Show the definition of a message, service, or action type.

### Setting up a Basic ROS 2 Workspace and Package

#### 1. Create a Workspace
A ROS 2 workspace is a directory where you store your ROS 2 packages.

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
```

#### 2. Initialize and Build the Workspace

```bash
vcs import src < https://github.com/ros2/examples.git > --recursive
rosdep install --from-paths src --ignore-src -r --os=ubuntu:jammy
colcon build --packages-skip-build-flags "--skip-autodetect-src" --symlink-install
```

#### 3. Source the Setup Files
To use the ROS 2 commands and packages in your workspace, you need to source the setup files.

```bash
source /opt/ros/humble/setup.bash  # Replace 'humble' with your ROS 2 distribution
source ~/ros2_ws/install/setup.bash
```

#### 4. Create a New Package

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_robot_controller
```
This creates a directory `my_robot_controller` with basic package structure, including `package.xml` and `setup.py`.

## Practical Exercises

### Exercise 1: ROS 2 Environment Setup and Introspection
**Objective**: To set up a basic ROS 2 environment and use command-line tools to inspect a running system.

**Instructions**:
1.  Ensure you have ROS 2 (e.g., Humble or Iron) installed and sourced on your system.
2.  Open two separate terminal windows.
3.  In the first terminal, run the ROS 2 `talker` node:
    ```bash
    ros2 run demo_nodes_cpp talker
    ```
4.  In the second terminal, source your ROS 2 environment.
5.  Use `ros2 node list` to find the `talker` node.
6.  Use `ros2 topic list` to identify the topic the `talker` node is publishing to.
7.  Use `ros2 topic echo <identified_topic_name>` to view the messages being published.

**Expected Output**:
*   The first terminal showing `[INFO] [talker]: Publishing: 'Hello World: <number>'` messages.
*   The second terminal displaying the topic list, node list including `talker`, and the echoed "Hello World" messages from the topic.

### Exercise 2: Creating and Building a Custom ROS 2 Package
**Objective**: To create a custom ROS 2 Python package and verify its build.

**Instructions**:
1.  Navigate to your ROS 2 workspace `~/ros2_ws/src`.
2.  Create a new Python package named `my_first_ros2_pkg`:
    ```bash
    ros2 pkg create --build-type ament_python my_first_ros2_pkg
    ```
3.  Navigate back to the root of your workspace `~/ros2_ws`.
4.  Build your workspace (only your new package will be compiled if nothing else changed):
    ```bash
    colcon build
    ```
5.  Source your workspace setup files (if not already sourced):
    ```bash
    source install/setup.bash
    ```
6.  Verify that your package can be found:
    ```bash
    ros2 pkg prefix my_first_ros2_pkg
    ```

**Expected Output**:
*   Successful `colcon build` output, indicating `my_first_ros2_pkg` was built.
*   `ros2 pkg prefix` command should return the installation path of your new package within `~/ros2_ws/install/`.


## References / Further Reading
*   ROS 2 Documentation: [https://docs.ros.org/en/humble/index.html](https://docs.ros.org/en/humble/index.html)
*   Open Robotics: [https://www.openrobotics.org/](https://www.openrobotics.org/)
*   DDS Standard (OMG): [https://www.omg.org/dds/](https://www.omg.org/dds/)
*   Macenski, S., et al. (2020). ROS 2: The Next Generation Robot Operating System. *arXiv preprint arXiv:2004.06721*.

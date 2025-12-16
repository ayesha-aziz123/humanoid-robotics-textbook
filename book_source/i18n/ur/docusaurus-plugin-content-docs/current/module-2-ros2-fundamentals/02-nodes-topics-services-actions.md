---
title: "ROS 2 میں نوڈس، ٹاپکس، سروسز، اور ایکشنز"
sidebar_position: 2
---

# ROS 2 میں نوڈس، ٹاپکس، سروسز، اور ایکشنز

## تعلّم کے اہداف
*   تقسیم شدہ نظام میں ROS 2 نوڈس کے کردار اور تعاملات کو وسعت دیں۔
*   ٹاپکس اور کسٹم میسج کا استعمال کرتے ہوئے شائع کریں/سبسکرائب کمیونیکیشن ماڈل کو سمجھیں۔
*   ROS 2 سروسز کا استعمال کرتے ہوئے ہم وقت درخواست/جواب کمیونیکیشن نافذ کریں۔
*   غیر ہم وقت، طویل مدت کے کاموں کے لیے ROS 2 ایکشنز تیار کریں اور استعمال کریں۔
*   پبلشرز، سبسکرائبرز، سروس سرورز، اور سروس کلائنٹس کے لیے سادہ ROS 2 نوڈس تخلیق کریں۔

## جامع مواد

ROS 2 میں، کمپیوٹیشنل گراف کو چند بنیادی مواصلاتی پرائمریز پر تعمیر کیا گیا ہے: نوڈس، ٹاپکس، سروسز، اور ایکشنز۔ یہ پرائمریز انفرادی سافٹ ویئر اجزاء کو مواصلت اور مربوط کرنے کی اجازت دیتے ہیں، پیچیدہ روبوٹک رویوں کو تشکیل دیتے ہیں۔ ہر ایک کو مؤثر طریقے سے استعمال کرنا ROS 2 ایپلی کیشنز کی مضبوط اور اسکیل ایبل ترقی کے لیے اہم ہے۔

### ROS 2 نوڈس

**تعریف**: ایک نوڈ ایک ایگزیکوٹیبل پروگرام ہے جو ROS 2 کلائنٹ لائبریریز (`rclcpp` C++ کے لیے یا `rclpy` Python کے لیے) کا استعمال کرتے ہوئے دیگر نوڈس کے ساتھ مواصلت کرتا ہے۔ ہر نوڈ کو ایک واحد، ماڈلر مقصد کے لیے ذمہ دار ہونا چاہیے (جیسے، ایک کیمرہ ڈرائیور، ایک موتور کنٹرولر، ایک راستہ منصوبہ بندی کار).

**اہم خصوصیات**:
*   **ماڈولریٹی**: نوڈس پیچیدہ نظاموں کو قابلِ انتظام اجزاء میں توڑ دیتے ہیں۔
*   **آزادی**: نوڈس الگ الگ عمل کے طور پر چلتے ہیں، جو نقص کی علیحدگی اور متوازی انجام دہی کی اجازت دیتا ہے۔
*   **مواصلت**: نوڈس ٹاپکس، سروسز، اور ایکشنز کے ذریعے تعامل کرتے ہیں۔
*   **لائف سائیکلز**: نوڈس کے منیجڈ لائف سائیکلز ہو سکتے ہیں (کنفیگر، چالو، غیر فعال، حتمی) مضبوط سسٹم رویہ کے لیے۔

**مثال: معمولی نوڈ (Python)**
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

### ROS 2 ٹاپکس (شائع کریں/سبسکرائب)

**تعریف**: ٹاپکس ایک شائع کریں/سبسکرائب کمیونیکیشن ماڈل کو نافذ کرتے ہیں، ڈیٹا کو اسٹریم کرنے کے لیے موزوں جس کے لیے براہ راست جواب کی ضرورت نہیں ہوتی۔ ایک نوڈ ایک نامزد ٹاپک پر میسج *شائع* کرتا ہے، اور کسی بھی تعداد میں دیگر نوڈس اس ٹاپک کو *سبسکرائب* کر سکتے ہیں تاکہ میسج وصول کر سکیں۔

**اہم خصوصیات**:
*   **غیر ہم وقت**: پبلشرز اور سبسکرائبرز کو آپس میں براہ راست جاننے کی ضرورت نہیں ہوتی۔
*   **بہت سے سے بہت سے**: متعدد پبلشرز ایک ٹاپک پر لکھ سکتے ہیں، اور متعدد سبسکرائبرز اس سے پڑھ سکتے ہیں۔
*   **ڈیٹا اسٹریمز**: مسلسل ڈیٹا کے بہاؤ کے لیے بہترین جیسے سینسر کے پڑھنے (کیمرہ امیجز، لائیڈار اسکینز)، اوڈومیٹری، یا جوائنٹ سٹیٹس۔
*   **میسج**: ڈیٹا کو از قبل تعریف شدہ میسج اقسام میں احاطہ کیا جاتا ہے (جیسے، `sensor_msgs/msg/Image`، `std_msgs/msg/String`)۔

**مثال: ٹاپک پر شائع کرنا (Python - اوپر کی طرح)**
`self.publisher_ = self.create_publisher(String, 'topic', 10)` 10 کے قیس کے سائز کے ساتھ `std_msgs/String` کی قسم کے `topic` نام کے ٹاپک پر پبلشر تخلیق کرتا ہے۔

**مثال: ٹاپک کو سبسکرائب کرنا (Python)**
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

### ROS 2 سروسز (درخواست/جواب)

**تعریف**: سروسز ایک ہم وقت درخواست/جواب کمیونیکیشن ماڈل نافذ کرتے ہیں۔ ایک کلائنٹ نوڈ ایک سروس سرور نوڈ کو ایک درخواست بھیجتا ہے اور جواب کا انتظار کرتا ہے۔ یہ ایسے آپریشنز کے لیے مناسب ہے جن میں ایک درخواست اور ایک واحد، فوری جواب شامل ہوتا ہے۔

**اہم خصوصیات**:
*   **ہم وقت**: کلائنٹ عام طور پر جواب ملنے تک بلاک ہو جاتا ہے۔
*   **ایک سے ایک**: ایک کلائنٹ ایک سروس سرور کو ایک درخواست بھیجتا ہے۔
*   **کارروائی کے قابل کام**: مفرد، کمانڈ جیسے کاموں کے لیے بہترین (جیسے، "موجودہ روبوٹ کا پوز حاصل کریں، "ڈیٹا ریکارڈ کرنا شروع کریں، "روشنی آن/آف کریں")۔
*   **سروس میسج**: ایک درخواست کی قسم اور ایک جواب کی قسم کے ذریعہ تعریف کیا گیا۔

**مثال: سروس کی تعریف (`AddTwoInts.srv`)**
```
int64 a
int64 b
---
int64 sum
```

**مثال: سروس سرور (Python)**
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

**مثال: سروس کلائنٹ (Python)**
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

### ROS 2 ایکشنز (گوئل/فیڈ بیک/نتیجہ)

**تعریف**: ایکشنز ایک زیادہ پیچیدہ کمیونیکیشن پیٹرن فراہم کرتے ہیں، ٹاپکس اور سروسز پر تعمیر کرتے ہوئے۔ وہ طویل وقت تک جاری رہنے والے، مداخلت کے قابل کاموں کے لیے ڈیزائن کیے گئے ہیں جہاں ایک کلائنٹ کو ایک گوئل بھیجنا ہوتا ہے، اس کی ترقی پر مسلسل فیڈ بیک وصول کرنا ہوتا ہے، اور بالآخر ایک حتمی نتیجہ حاصل کرنا ہوتا ہے۔ کلائنٹ گوئل کو منسوخ بھی کر سکتا ہے۔

**اہم خصوصیات**:
*   **غیر ہم وقت گوئل کے لحاظ سے**: کلائنٹ ایک گوئل بھیجتا ہے اور انجام دہی جاری رکھتا ہے۔
*   **فیڈ بیک**: سرور کام کی ترقی پر مسلسل اپ ڈیٹس فراہم کرتا ہے۔
*   **نتیجہ**: سرور مکمل ہونے پر ایک حتمی نتیجہ بھیجتا ہے۔
*   **منسوخ کرنا ممکن**: کلائنٹ فعال گوئل کو منسوخ کرنے کی درخواست کر سکتا ہے۔
*   **ایکشن میسج**: ایک گوئل، نتیجہ، اور فیڈ بیک کی تعریف پر مشتمل ہوتا ہے۔

**مثال: ایکشن کی تعریف (`Fibonacci.action`)**
```
int32 order
---
int32[] sequence
---
int32[] partial_sequence
```

**مثال: ایکشن سرور (Python - سادہ)**

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

## عملی مشقیں

### مشق 1: ایک سادہ ROS 2 پبلشر-سبسکرائبر جوڑی نافذ کریں
**مقصد**: دو ROS 2 نوڈس تخلیق کرنا، ایک کسٹم سٹرنگ میسج شائع کر رہا ہے اور دوسرا اس کو سبسکرائب کر رہا اور پرنٹ کر رہا ہے۔

**ہدایات**:
1.  **ROS 2 پیکج تخلیق کریں**: اگر آپ نے ابھی تک نہیں کیا، تو اپنے ورک سپیس (`~/ros2_ws/src`) میں `my_talk_listen_pkg` نام کا ایک Python پیکج تخلیق کریں۔
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_python my_talk_listen_pkg
    ```
2.  **پبلشر نوڈ**: `my_talk_listen_pkg/my_talk_listen_pkg/` کے اندر، `talker.py` تخلیق کریں جو `/my_chat` نام کے ٹاپک پر `std_msgs/String` میسج شائع کرے۔ میسج میں "Hello from my custom publisher!" کے ساتھ ایک کاؤنٹر ہونا چاہیے، ہر 1 سیکنڈ بعد۔
3.  **سبسکرائبر نوڈ**: اسی ڈائریکٹری میں `/my_chat` کو سبسکرائب کرنے اور وصول کردہ میسج کو پرنٹ کرنے والے `listener.py` کو تخلیق کریں۔
4.  **`setup.py` اپ ڈیٹ کریں**: `my_talk_listen_pkg/setup.py` میں `talker.py` اور `listener.py` کے لیے اینٹری پوائنٹس شامل کریں۔
5.  **تعمیر اور چلائیں**: اپنا ورک سپیس (`colcon build`) تعمیر کریں اور پھر الگ الگ ٹرمنلز میں دونوں نوڈس چلائیں، یقینی بنائیں کہ آپ ورک سپیس سیٹ اپ فائلوں کو سورس کر رہے ہیں۔

**متوقع نتیجہ**:
*   پبلشر نوڈ ٹرمنل "Publishing: 'Hello from my custom publisher! X'" میسج دکھا رہا ہوگا۔
*   سبسکرائبر نوڈ ٹرمنل "I heard: 'Hello from my custom publisher! X'" میسج دکھا رہا ہوگا، جہاں X بڑھتی ہوئی کاؤنٹر ہے۔

### مشق 2: ROS 2 سروس کلائنٹ-سرور تعامل
**مقصد**: ایک سادہ ریاضی کے عمل کے لیے ROS 2 سروس سرور اور کلائنٹ نافذ کرنا۔

**ہدایات**:
1.  **ایک سروس کی تعریف کریں**: آپ کے `my_talk_listen_pkg` (یا ایک نئے پیکج) میں، ایک سروس `MultiplyTwoInts.srv` کی تعریف کریں:
    ```
    int64 a
    int64 b
    ---
    int64 product
    ```
    یقینی بنائیں کہ آپ `CMakeLists.txt` اور `package.xml` کو اس سروس کو تعمیر کرنے کے لیے تبدیل کریں (کسٹم انٹرفیس کی تعمیر کے لیے ROS 2 دستاویزات کا مراجعہ کریں)۔
2.  **سروس سرور نوڈ**: `MultiplyTwoInts` سروس کو نافذ کرنے والا `multiplier_server.py` تخلیق کریں۔ جب کال کیا جائے، تو یہ دو انٹیجرز کو ضرب دے کر نتیجہ لوٹائے گا۔
3.  **سروس کلائنٹ نوڈ**: `MultiplyTwoInts` سروس کو دو نمبروں (جیسے، 7 اور 8) کے ساتھ کال کرنے اور لوٹائے گئے نتیجہ کو پرنٹ کرنے والا `multiplier_client.py` تخلیق کریں۔
4.  **تعمیر اور چلائیں**: اپنا ورک سپیس تعمیر کریں۔ ایک ٹرمنل میں سرور نوڈ چلائیں اور دوسرے میں کلائنٹ نوڈ چلائیں۔ کلائنٹ ایک درخواست کرے گا، نتیجہ پرنٹ کرے گا، اور پھر ختم ہو جائے گا۔

**متوقع نتیجہ**:
*   سرور ٹرمنل "Incoming request: a: 7 b: 8" (یا آپ کے منتخب کردہ نمبر) دکھا رہا ہوگا۔
*   کلائنٹ ٹرمنل "Result of multiply_two_ints: for 7 * 8 = 56" (یا آپ کا حساب کردہ نتیجہ) دکھا رہا ہوگا۔
---
title: "گزیبو میں فزکس سیمیولیشن اور سینسرز"
sidebar_position: 2
---

# گزیبو میں فزکس سیمیولیشن اور سینسرز

## تعلّم کے اہداف
*   وضاحت کریں کہ فزکس انجن گزیبو میں سخت جسم کی ڈائنیمکس، کالیژن، اور کنٹیکٹس کو کیسے سیمیولیٹ کرتے ہیں۔
*   حقیقی سیمیولیشن کے لیے ماس، انیشیا، فریکشن، اور ڈیمپنگ جیسی جسمانی خصوصیات کو ترتیب دیں۔
*   گزیبو ماڈلز کے اندر مختلف ورچوئل سینسر قسمیں (جیسے، کیمرہ، لائیڈار، آئی ایم یو) کو نافذ اور ترتیب دیں۔
*   ROS 2 انٹرفیسز کے ذریعے سیمیولیٹڈ سینسر ڈیٹا تک رسائی اور اس کی پروسیسنگ کرنے کا طریقہ سمجھیں۔
*   سیمیولیشن فائیڈلٹی اور کمپیوٹیشنل کارکردگی کے درمیان کے تنازعات کا تجزیہ کریں۔

## جامع مواد

گزیبو کی طاقت اس کی اہمیت میں ہے کہ یہ ایک حقیقی فزکس سیمیولیشن فراہم کر سکتا ہے اور مختلف سینسرز کی نقل کر سکتا ہے۔ یہ جسمانی مصنوعی ذہانت اور ہیومنوائڈ روبوٹکس کے لیے مؤثر سیمیولیشن تخلیق کرنے کے لیے فزکس کی خصوصیات اور ورچوئل سینسرز کو ترتیب دینا سیکھنا کلیدی ہے۔

### تفصیل میں فزکس سیمیولیشن

گزیبو کئی اعلی درجے کے فزکس انجن کے ساتھ ضم ہوتا ہے تاکہ سخت اجسام کے رویے کا حساب لگایا جا سکے، بشمول:
*   **ODE (Open Dynamics Engine)**: سخت جسم کی ڈائنیمکس کو سیمیولیٹ کرنے کے لیے ایک وسیع پیمانے پر استعمال ہونے والا، ہائی پرفارمنس لائبریری۔
*   **Bullet**: ایک اور مقبول اوپن سورس فزکس انجن، جو اس کی کالیژن ڈیٹیکشن اور نرم جسم کی ڈائنیمکس کے لیے مشہور ہے۔
*   **DART (Dynamic Animation and Robotics Toolkit)**: روبوٹکس اور مربوط اشکال کے لیے تیز اور درست حساب کتاب پر مرکوز ہے۔
*   **Simbody**: بائیو میکانکس اور جنرل سخت جسم کی ڈائنیمکس کے لیے بہترین ہے۔

یہ انجن حرکت کے پیچیدہ ایکویشنز کو حل کرتے ہیں تاکہ یہ متعین کیا جا سکے کہ اجسام مختلف قوتوں (گریویٹی، فریکشن، کنٹیکٹ) کے تحت کیسے حرکت کرتے ہیں، گھومتے ہیں، اور تعامل کرتے ہیں۔ فزکس سیمیولیشن کے کلیدی پہلوؤں میں شامل ہیں:

1.  **سخت جسم کی ڈائنیمکس**: اطلاق کردہ قوتوں اور ٹورکس کی بنیاد پر لنکس کی منتقلی اور گردش کی حرکت کا حساب لگانا، جن میں ان کی ماس اور ادراک کی خصوصیات کو مدنظر رکھنا۔
2.  **کالیژن ڈیٹیکشن**: کارآمد طریقے سے یہ تعین کرنا کہ کیا دو یا زیادہ اجسام اوور لیپ ہو رہے ہیں یا رابطے میں ہیں۔ یہ اکثر کمپیوٹیشنل طور پر کثیر تعداد میں ہوتا ہے اور سادہ کالیژن جیومیٹریز پر انحصار کرتا ہے۔
3.  **کنٹیکٹ ریزولوشن**: ایک بار کالیژن کا پتہ چلنے کے بعد، فزکس انجن کنٹیکٹ قوتوں اور امپلسز کا حساب لگاتا ہے جو اندرونی داخل کو روکنے اور حقیقی کودنے یا پھسلنے کے رویے کو سیمیولیٹ کرنے کے لیے ضروری ہیں۔ اس میں فریکشن اور ریسٹیٹوشن کے کوائف شامل ہوتے ہیں۔
4.  **جوائینٹ کنٹریکٹس**: وضاحت شدہ جوائینٹس (جیسے، ریوولوٹ، پریزمیٹک، فکسڈ) کی طرف سے اجازت دی گئی حرکت کی حدود اور قسموں کو نافذ کرنا۔

#### SDF میں جسمانی خصوصیات کی ترتیب

حقیقی فزکس سیمیولیشن کے لیے آپ کے SDF (یا Gazebo ایکسٹینشنز کے ساتھ URDF) میں ہر `<link>` کے لیے جسمانی خصوصیات کی مناسب وضاحت کی ضرورت ہوتی ہے:
*   **`<inertial>`**: حقیقی ڈائنیمکس کے لیے اہم۔
    *   `mass`: کلوگرام میں لنک کی ماس۔
    *   `origin`: لنک کے مقامی فریم کے رشتے میں ماس کا مرکز۔
    *   `inertia` میٹرکس: یہ وضاحت کرتا ہے کہ ماس کو ماس کے مرکز کے گرد کیسے تقسیم کیا گیا ہے، جو گردشی ڈائنیمکس کو متاثر کرتا ہے۔ سادہ شکلوں کے لیے، ان کا حساب لگایا جا سکتا ہے، لیکن پیچیدہ میشز کے لیے، ان کا تخمینہ لگانا یا CAD سافٹ ویئر سے حاصل کرنا ضروری ہوتا ہے۔
*   **`<collision>`**: کالیژن ڈیٹیکشن کے لیے استعمال ہونے والی جیومیٹری کی وضاحت کرتا ہے۔ یہ کمپیوٹیشنل کارآمدی کے لیے `<visual>` جیومیٹری کا اکثر ایک سادہ ورژن ہوتا ہے۔
*   **`<surface>` (اندر `<collision>`)**: کنٹیکٹ کے لیے میٹریل کی خصوصیات کی وضاحت کرتا ہے:
    *   `<friction>`: کوائف `mu1` اور `mu2` (سٹیٹک/ڈائنیمک فریکشن)، `fdir1` (فریکشن کی سمت)۔
    *   `<bounce>`: `restitution_coefficient` (کالیژن کی لچک)۔

**مثال: ایک لنک کے لیے فریکشن کی ترتیب (SDF)**
```xml
<link name="my_link">
  <collision name="collision_geom">
    <geometry>
      <box><size>0.1 0.1 0.1</size></box>
    </geometry>
    <surface>
      <friction>
        <ode>
          <mu>0.8</mu>
          <mu2>0.8</mu2>
        </ode>
      </friction>
      <bounce>
        <restitution_coefficient>0.1</restitution_coefficient>
      </bounce>
    </surface>
  </collision>
  ...
</link>
```

### ورچوئل سینسر نافذ کرنا

گزیبو آپ کو اپنے روبوٹ ماڈلز میں ورچوئل سینسرز شامل کرنے کی اجازت دیتا ہے، جو حقیقی دنیا کے سینسرز کے رویے کو نقل کرتے ہیں اور ROS 2 میسج ٹائپس کے ساتھ ڈیٹا شائع کرتے ہیں۔ یہ ادراک الگورتھم کی براہ راست جانچ کو فعال کرتا ہے۔

#### 1. کیمرہ سینسر
*   **قسم**: `<sensor type="camera" name="my_camera">`
*   **کنفیگریشن**: `horizontal_fov`, `image` ابعاد (`width`, `height`), `format` (جیسے، `R8G8B8`), `near`, `far` کلپنگ پلینز، `lens` خصوصیات۔
*   **ROS 2 آؤٹ پٹ**: `sensor_msgs/Image` (کلر)، `sensor_msgs/CameraInfo`، اور کبھی کبھی `sensor_msgs/PointCloud2` (اگر گہرائی فعال ہو) شائع کرتا ہے۔

**کیمرہ سینسر کی مثال (SDF)**
```xml
<link name="camera_link">
  <sensor type="camera" name="camera">
    <pose>0 0 0 0 0 0</pose>
    <visualize>true</visualize>
    <camera>
      <horizontal_fov>1.047</horizontal_fov>
      <image>
        <width>640</width>
        <height>480</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.1</near>
        <far>100</far>
      </clip>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <ros> <namespace>my_robot</namespace> <output_type>sensor_msgs/Image</output_type> </ros>
      <camer-name>camera_sensor</camer-name>
      <frame_name>camera_link_optical</frame_name>
    </plugin>
  </sensor>
</link>
```

#### 2. لائیڈار سینسر
*   **قسم**: `<sensor type="ray" name="my_lidar">` (2D یا 3D لیزر اسکینرز کے لیے)
*   **کنفیگریشن**: `horizontal` (`samples`, `resolution`, `min_angle`, `max_angle`), `vertical` (اگر 3D ہو), `range` (`min`, `max`, `resolution`)۔
*   **ROS 2 آؤٹ پٹ**: `sensor_msgs/LaserScan` (2D) یا `sensor_msgs/PointCloud2` (3D) شائع کرتا ہے۔

**لائیڈار سینسر کی مثال (SDF)**
```xml
<link name="lidar_link">
  <sensor type="ray" name="gpu_lidar">
    <pose>0 0 0 0 0 0</pose>
    <visualize>true</visualize>
    <ray>
      <scan>
        <horizontal>
          <samples>640</samples>
          <resolution>1</resolution>
          <min_angle>-2.2</min_angle>
          <max_angle>2.2</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.1</min>
        <max>10.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="gpu_lidar_controller" filename="libgazebo_ros_laser.so">
      <ros> <namespace>my_robot</namespace> <output_type>sensor_msgs/LaserScan</output_type> </ros>
      <topic_name>laser_scan</topic_name>
      <frame_name>lidar_link</frame_name>
    </plugin>
  </sensor>
</link>
```

#### 3. آئی ایم یو سینسر
*   **قسم**: `<sensor type="imu" name="my_imu">`
*   **کنفیگریشن**: `accelerometer` (`noise`), `gyroscope` (`noise`)۔
*   **ROS 2 آؤٹ پٹ**: `sensor_msgs/Imu` شائع کرتا ہے۔

**آئی ایم یو سینسر کی مثال (SDF)**
```xml
<link name="imu_link">
  <sensor type="imu" name="imu_sensor">
    <always_on>true</always_on>
    <update_rate>100</update_rate>
    <imu>
      <orientation>
        <x>0</x><y>0</y><z>0</z>
        <drift>0.005 0.005 0.005</drift>
        <noise>0.005 0.005 0.005</noise>
      </orientation>
      <angular_velocity>
        <x>0</x><y>0</y><z>0</z>
        <drift>0.01 0.01 0.01</drift>
        <noise>0.01 0.01 0.01</noise>
      </angular_velocity>
      <linear_acceleration>
        <x>0</x><y>0</y><z>0</z>
        <drift>0.02 0.02 0.02</drift>
        <noise>0.02 0.02 0.02</noise>
      </linear_acceleration>
    </imu>
    <plugin name="imu_plugin" filename="libgazebo_ros_imu_sensor.so">
      <ros> <namespace>my_robot</namespace> <output_type>sensor_msgs/Imu</output_type> </ros>
      <topic_name>imu/data</topic_name>
      <frame_name>imu_link</frame_name>
    </plugin>
  </sensor>
</link>
```

### سیمیولیٹڈ سینسر ڈیٹا تک رسائی (ROS 2)

گزیبو-ROS 2 پلگ انز سیمیولیشن کو ROS 2 سے جوڑتے ہیں، معیاری ROS 2 ٹاپکس پر سینسر ڈیٹا شائع کرتے ہیں۔ پھر آپ `ros2 topic echo` کا استعمال کر سکتے ہیں یا سبسکرائبر نوڈس لکھ سکتے ہیں تاکہ اس ڈیٹا کو پروسیس کیا جا سکے، بالکل ایسے جیسے حقیقی روبوٹ سینسر ڈیٹا کے ساتھ کیا جاتا ہے۔

```bash
# مثال: کیمرہ امیج ٹاپکس کو ایکو کرنا بعد اس کے کہ ایک کیمرہ پلگ ان کے ساتھ ایک روبوٹ لانچ کیا گیا
ros2 topic list
ros2 topic echo /my_robot/camera_sensor/image_raw
```

### سیمیولیشن فائیڈلٹی بمقابلہ کارکردگی کے تنازعات

اعلی درجے کی حقیقی سیمیولیشن حاصل کرنا اکثر کمپیوٹیشنل لاگت کے ساتھ آتا ہے:
*   **ہائی فائیڈلٹی**: زیادہ پیچیدہ جیومیٹریز، درست ادراک کی خصوصیات، تفصیلی سینسر نوائس ماڈلز، چھوٹے فزکس ٹائم سٹیپس۔
    *   **فوائد**: حقیقی دنیا کے رویے کے قریب، سیم2ریل ٹرانسفر کے لیے بہتر۔
    *   **نقصانات**: سست سیمیولیشن، زیادہ کمپیوٹیشنل وسائل کی ضرورت ہوتی ہے۔
*   **کم فائیڈلٹی/ہائی کارکردگی**: سادہ جیومیٹریز، بڑے فزکس پیرامیٹر، کم تفصیلی سینسر ماڈلز، بڑے فزکس ٹائم سٹیپس۔
    *   **فوائد**: تیز سیمیولیشن، تیز پروٹو ٹائپنگ یا ایجنٹس کی بڑی تعداد کی تربیت کے لیے مفید۔
    *   **نقصانات**: حقیقت کی کم درست نمائندگی، بڑا سیم2ریل خلا۔

ڈیولپرز کو اپنی مخصوص اطلاقیہ کی بنیاد پر ان تنازعات کو متوازن کرنا چاہیے۔ ہیومنوائڈ روبوٹکس کے لیے، توازن اور پیچیدہ ہیرا پھیری جیسے اہم علاقوں کو اکثر زیادہ فائیڈلٹی کی ضرورت ہوتی ہے۔

## عملی مشقیں

### مشق 1: SDF میں لنک فزکس کی خصوصیات کی ترتیب
**مقصد**: ایک موجودہ SDF ماڈل کو تبدیل کرنا تاکہ مخصوص فریکشن اور باؤنس کی خصوصیات شامل ہو جائیں۔

**ہدایات**:
1.  پچھلے باب سے `humanoid_arm.urdf` لیں (یا اگر آپ ترجیح دیں تو ایک سادہ SDF ماڈل)۔
2.  **SDF میں تبدیل کریں (اگر URDF ہو)**: اگر یہ URDF ہے، تو آپ `ros2 run urdf_to_sdf urdf_to_sdf /path/to/humanoid_arm.urdf > /path/to/humanoid_arm.sdf` استعمال کر سکتے ہیں۔
3.  `humanoid_arm.sdf` فائل کھولیں۔
4.  `forearm_link` کے لیے `<collision>` ٹیگ تلاش کریں۔ اس ٹیگ کے اندر، ایک `<surface>` عنصر شامل کریں جس میں:
    *   `friction` `mu` اور `mu2` ویلیوز `0.9`۔
    *   `bounce` `restitution_coefficient` `0.5`۔
5.  تبدیل شدہ SDF فائل محفوظ کریں۔

**متوقع نتیجہ**:
`forearm_link` کے کالیژن عنصر کے لیے شامل `<surface>` خصوصیات کے ساتھ ایک `humanoid_arm.sdf` فائل۔

### مشق 2: روبوٹ ماڈل میں ایک ورچوئل کیمرہ سینسر شامل کرنا
**مقصد**: گزیبو میں ایک سادہ روبوٹ ماڈل میں ایک ورچوئل کیمرہ سینسر شامل کرنا اور اس کا ڈیٹا آؤٹ پٹ کی تصدیق کرنا۔

**ہدایات**:
1.  مشق 1 سے اپنے `humanoid_arm.sdf` (یا کسی اور سادہ روبوٹ SDF ماڈل) کے ساتھ جاری رکھیں۔
2.  ایک نیا `<link>` نام `head_link` اپنے روبوٹ میں شامل کریں، `fixed` جوائینٹ کے ذریعے `base_link` (یا `upper_arm_link`) سے منسلک۔ اسے سادہ ویژول/کالیژن/ادراک کی خصوصیات دیں۔
3.  `head_link` کے اندر، ایک `<sensor type="camera" name="head_camera">` شامل کریں بنیادی کنفیگریشنز کے ساتھ (جیسے، `horizontal_fov`, `image` ابعاد 640x480, `format R8G8B8`)۔
4.  اس سینسر میں ایک `libgazebo_ros_camera.so` پلگ ان شامل کریں، یقینی بنائیں کہ یہ ایک ROS 2 ٹاپک پر شائع کر رہا ہے (جیسے، `/robot/camera/image_raw`)۔
5.  اپنے تبدیل شدہ SDF ماڈل کے ساتھ گزیبو لانچ کریں۔
6.  ایک الگ ٹرمنل میں، `ros2 topic list` استعمال کریں تاکہ یہ تصدیق کی جا سکے کہ کیمرہ ٹاپک شائع ہو رہا ہے، پھر `ros2 topic echo <camera-image_topic>` استعمال کریں تاکہ خام امیج ڈیٹا دیکھا جا سکے (یا ویژول آؤٹ پٹ کے لیے `rqt_image_view`)۔

**متوقع نتیجہ**:
*   گزیبو میں "سر" (اور کیمرہ) کے ساتھ آپ کا روبوٹ ماڈل نظر آئے گا۔
*   ROS 2 ٹاپک `/robot/camera/image_raw` `ros2 topic list` میں ظاہر ہوگا۔
*   ٹرمنل میں امیج میسج کا کامیاب ایکو یا `rqt_image_view` میں ویژولائزیشن۔


## حوالہ جات / مزید مطالعہ
*   گزیبو SDF ٹیوٹوریل - سینسرز: [http://gazebosim.org/tutorials?tut=sensors_main](http://gazebosim.org/tutorials?tut=sensors_main)
*   گزیبو SDF ٹیوٹوریل - فزکس: [http://gazebosim.org/tutorials?tut=physics_params](http://gazebosim.org/tutorials?tut=physics_params)
*   `libgazebo_ros_camera` پلگ ان: [https://github.com/ros-simulation/gazebo_ros_pkgs/blob/ros2/gazebo_plugins/src/gazebo_ros_camera.cpp](https://github.com/ros-simulation/gazebo_ros_pkgs/blob/ros2/gazebo_plugins/src/gazebo_ros_camera.cpp)
*   ROS 2 امیج ٹرانسپورٹ (for `rqt_image_view`): [https://wiki.ros.org/image_transport](https://wiki.ros.org/image_transport)
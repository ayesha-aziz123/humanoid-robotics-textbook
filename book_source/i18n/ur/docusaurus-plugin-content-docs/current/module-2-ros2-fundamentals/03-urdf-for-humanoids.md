---
title: "ہیومنوائڈز کے لیے URDF"
sidebar_position: 3
---

# ہیومنوائڈز کے لیے URDF

## تعلّم کے اہداف
*   URDF (متحدہ روبوٹ کی تفصیل کا فارمیٹ) فائلوں کے مقصد اور ساخت کو سمجھیں۔
*   URDF میں `link` اور `joint` عناصر اور ان کے صفات کی وضاحت کریں۔
*   ایک سادہ روبوٹ بازو یا ہیومنوائڈ اعضا کے لیے ایک بنیادی URDF ماڈل تخلیق کریں۔
*   ویژولائزیشن ٹولز (جیسے، `rviz2`) کا استعمال URDF ماڈلز کو ظاہر کرنے اور ڈیبگ کرنے کے لیے کریں۔
*   سیمیولیشن خصوصیات کے لیے Gazebo مخصوص ٹیگس کے ساتھ URDF کو وسعت دیں۔

## جامع مواد

URDF (متحدہ روبوٹ کی تفصیل کا فارمیٹ) روبوٹ کی کائینمیٹک اور ڈائینمک خصوصیات کی وضاحت کے لیے ایک XML فارمیٹ ہے۔ یہ ROS 2 میں روبوٹ کی جسمانی ساخت کی وضاحت کے لیے ایک اہم ٹول ہے، بشمول اس کے لنکس (سخت اجسام) اور جوائینٹس (لنکس کے درمیان کنکشنز)۔ ہیومنوائڈ روبوٹکس کے لیے، URDF ہیومنوائڈ جیسی پیچیدہ ساخت کی درست نمائندگی کے لیے اہم ہے، سیمیولیشن، موشن پلاننگ، اور کنٹرول کو فعال کرتا ہے۔

### URDF کا تعارف

URDF فائل روبوٹ کی جسمانی خصوصیات کی مکمل تفصیل فراہم کرتی ہے، جس سے سافٹ ویئر اجزاء کو اس کی جیومیٹری، ادراک کی خصوصیات، اور اس کے اجزاء کے مابین رشتہ حرکت کو سمجھنے کی اجازت ملتی ہے۔ یہ تفصیل مختلف ROS 2 ٹولز کے ذریعے ویژولائزیشن، سیمیولیشن، اور کنٹرول کے لیے استعمال کی جاتی ہے۔

**ہیومنوائڈز کے لیے URDF کیوں؟**
ہیومنوائڈ روبوٹس کے پاس بہت سے ڈگریز آف فریڈم اور ایک پیچیدہ کائینمیٹک چین ہوتی ہے۔ URDF ڈیولپرز کو اجازت دیتا ہے:
*   **ماڈل کی ساخت**: ٹورسو، سر، بازؤں، پیروں، اور ان کے مابین کنکشنز کی وضاحت کریں۔
*   **ویژولائز**: `rviz2` میں ہیومنوائڈ کی 3D نمائندگی دیکھیں۔
*   **سیمیولیٹ**: ماڈل کو Gazebo جیسے فزکس سیمیولیٹرز میں شامل کریں۔
*   **کنٹرول**: موشن پلاننگ اور انورس کائینمیٹکس کے لیے کائینمیٹک اور ڈائینمک خصوصیات کا استعمال کریں۔

### بنیادی URDF عناصر: `link` اور `joint`

URDF فائل بنیادی طور پر `<link>` اور `<joint>` عناصر سے مرکب ہوتی ہے، جو سب کو ایک روٹ `<robot>` ٹیگ کے اندر احاطہ کیا جاتا ہے۔

#### 1. `<link>` عنصر
ایک `<link>` روبوٹ کے سخت جسم کے حصے کی نمائندگی کرتا ہے۔ یہ اس حصے کی ویژول، ادراک، اور کالیژن کی خصوصیات کی وضاحت کرتا ہے۔

**`<link>` کی کلیدی صفات/ذیلی عناصر**:
*   **`name` (ضروری)**: لنک کے لیے منفرد شناخت کار۔
*   **`<visual>`**: یہ وضاحت کرتا ہے کہ لنک کیسے نظر آتا ہے (جیومیٹری، رنگ، ٹیکسچر)۔
    *   `geometry`: شکل (بکس، سلنڈر، سپیئر، میش)۔
    *   `material`: رنگ یا ٹیکسچر۔
    *   `origin`: لنک کے مقامی اصل سے ویژول جیومیٹری کے اصل تک رشتہ تبدیل کریں۔
*   **`<collision>`**: لنک کی کالیژن کی خصوصیات کی وضاحت کرتا ہے، جسے فزکس انجن کال کا پتہ لگانے کے لیے استعمال کرتے ہیں۔
    *   `geometry`: شکل (کمپیوٹیشنل کارآمدی کے لیے ویژول جیومیٹری سے سادہ کیا جاتا ہے)۔
    *   `origin`: رشتہ تبدیل کریں۔
*   **`<inertial>`**: لنک کی ماس کی خصوصیات (ماس، ماس کا مرکز، انیشیا میٹرکس) کی وضاحت کرتا ہے، جو ڈائینمک سیمیولیشن کے لیے اہم ہے۔
    *   `mass`: لنک کی ماس۔
    *   `origin`: ماس کا مرکز لنک کے مقامی اصل کے رشتے میں۔
    *   `inertia`: 3x3 گردشی انیشیا میٹرکس (Ixx, Iyy, Izz, Ixy, Ixz, Iyz)۔

**`link` کی مثال کی وضاحت:**
```xml
<link name="base_link">
  <visual>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 0.8 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <box size="0.6 0.4 0.2"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="10"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
  </inertial>
</link>
```

#### 2. `<joint>` عنصر
ایک `<joint>` دو لنکس کے درمیان کنکشن کی وضاحت کرتا ہے، جس سے ان کا کائینمیٹک رشتہ اور کوئی حرکت کی پابندیاں متعین ہوتی ہیں۔ جوائینٹس ایک `parent` لنک کو ایک `child` لنک سے جوڑتے ہیں۔

**`<joint>` کی کلیدی صفات/ذیلی عناصر**:
*   **`name` (ضروری)**: جوائینٹ کے لیے منفرد شناخت کار۔
*   **`type` (ضروری)**: جوائینٹ کی قسم (جیسے، `revolute`, `continuous`, `prismatic`, `fixed`, `floating`, `planar`)۔
    *   `revolute`: ایک ہنگ جوائینٹ جو ایک سنگل ایکسز کے گرد گھومتا ہے، محدود حد کے ساتھ۔
    *   `continuous`: ایک ہنگ جوائینٹ جو ایک سنگل ایکسز کے گرد گھومتا ہے، بغیر حد کے۔
    *   `prismatic`: ایک سلائیڈنگ جوائینٹ جو ایک سنگل ایکسز کے ساتھ چلتا ہے، حد کے ساتھ۔
    *   `fixed`: دو لنکس کے درمیان ایک سخت کنکشن (کوئی حرکت نہیں)۔
*   **`<parent>`**: والد لنک کا نام متعین کرتا ہے۔
*   **`<child>`**: بچے کے لنک کا نام متعین کرتا ہے۔
*   **`<origin>`**: والد لنک کے اصل سے بچے کے لنک کے اصل تک رشتہ تبدیل کی وضاحت کرتا ہے جب جوائینٹ اس کی ڈیفالٹ پوزیشن پر ہو (revolute/prismatic کے لیے 0، یا جیسا کہ حد کے ذریعے متعین کیا گیا ہو)۔
    *   `xyz`: پوزیشن آفسیٹ۔
    *   `rpy`: رول، پچ، یوو ریوٹیشن آفسیٹ (ریڈین میں)۔
*   **`<axis>`**: revolute/continuous جوائینٹس کے لیے گردش کا ایکسز یا prismatic جوائینٹس کے لیے ترجمہ کی وضاحت کرتا ہے۔
    *   `xyz`: جوائینٹ فریم میں ایکسز کی نشاندہی کرنے والا ویکٹر۔
*   **`<limit>`**: revolute اور prismatic جوائینٹس کے لیے، حرکت، رفتار، اور کوشش کی اوپری اور نچلی حدود کی وضاحت کرتا ہے۔
    *   `lower`, `upper`: جوائینٹ کی حدود۔
    *   `velocity`: زیادہ سے زیادہ رفتار۔
    *   `effort`: زیادہ سے زیادہ کوشش۔

**`joint` کی مثال کی وضاحت:**
```xml
<joint name="shoulder_joint" type="revolute">
  <parent link="base_link"/>
  <child link="upper_arm_link"/>
  <origin xyz="0.3 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1.0"/>
</joint>
```

### ایک بنیادی URDF ماڈل تخلیق کرنا (تصوراتی سادہ بازو)
آئیے ایک سادہ دو لنک روبوٹ بازو کے تصور کو سمجھتے ہیں جس میں ایک بیس، ایک اوپری بازو، اور ایک کلائی شامل ہو۔

```xml
<?xml version="1.0"?>
<robot name="simple_arm">

  <!-- بیس لنک -->
  <link name="base_link">
    <visual>
      <geometry><box size="0.2 0.2 0.1"/></geometry>
      <material name="red"><color rgba="0.8 0 0 1"/></material>
    </visual>
    <inertial>
      <mass value="1.0"/><origin xyz="0 0 0"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- شولڈر جوائینٹ -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_arm_link"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="0.5"/>
  </joint>

  <!-- اوپری بازو لنک -->
  <link name="upper_arm_link">
    <visual>
      <geometry><cylinder radius="0.05" length="0.5"/></geometry>
      <material name="green"><color rgba="0 0.8 0 1"/></material>
    </visual>
    <inertial>
      <mass value="0.5"/><origin xyz="0 0 0.25"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.001"/>
    </inertial>
  </link>

  <!-- البو جوائینٹ -->
  <joint name="elbow_joint" type="revolute">
    <parent link="upper_arm_link"/>
    <child link="forearm_link"/>
    <origin xyz="0 0 0.5" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="0.5"/>
  </joint>

  <!-- کلائی لنک -->
  <link name="forearm_link">
    <visual>
      <geometry><cylinder radius="0.04" length="0.4"/></geometry>
      <material name="blue"><color rgba="0 0 0.8 1"/></material>
    </visual>
    <inertial>
      <mass value="0.3"/><origin xyz="0 0 0.2"/>
      <inertia ixx="0.005" ixy="0" ixz="0" iyy="0.005" iyz="0" izz="0.0005"/>
    </inertial>
  </link>

</robot>
```

### `rviz2` کے ساتھ ویژولائزیشن
`rviz2` ROS 2 کے لیے بنیادی 3D ویژولائزیشن ٹول ہے۔ یہ URDF ماڈلز، سینسر ڈیٹا، اور پلاننگ آؤٹ پٹ دکھا سکتا ہے۔

URDF دیکھنے کے لیے:
1.  ایک `robot_state_publisher` نوڈ چلائیں جو URDF فائل کو پڑھتا ہے اور روبوٹ کی جوائینٹ سٹیٹس کو `/tf` ٹاپک پر ٹرانسفارم کے طور پر شائع کرتا ہے۔
2.  `rviz2` لانچ کریں اور "RobotModel" ڈسپلے شامل کریں، `/tf` ٹاپک کو سبسکرائب کریں۔

**کمانڈ کی مثالیں**:
```bash
# ایک ٹرمنل میں، URDF پر مشتمل آپ کے پیکج میں جائیں (مثلاً ایک لانچ فائل میں)
ros2 launch urdf_tutorial display.launch.py model:=src/my_robot_description/urdf/simple_arm.urdf

# یا، دستی طور پر robot_state_publisher اور joint_state_publisher_gui شروع کریں
# 1. robot_state_publisher شروع کریں (آپ کے URDF راستہ کے ساتھ کنفیگر کیا جانا چاہیے)
# ros2 run robot_state_publisher robot_state_publisher --ros-args -p robot_description:="$(cat /path/to/your/robot.urdf)"

# 2. joint_state_publisher_gui شروع کریں (براہ راست جوائینٹ مینوپولیشن کے لیے)
ros2 run joint_state_publisher_gui joint_state_publisher_gui

# 3. rviz2 شروع کریں
rviz2
```

### Gazebo ٹیگس کے ساتھ URDF کو وسعت دینا

جیسے کہ URDF روبوٹ کی کائینمیٹکس اور بنیادی ڈائینمکس کی وضاحت کرتا ہے، فزکس سیمیولیٹرز جیسے Gazebo کو اضافی خصوصیات کی ضرورت ہوتی ہے (جیسے، موتور کی خصوصیات، فریکشن، سینسر نوائس)۔ ان کو URDF کے اندر غیر معیاری XML ٹیگس کے ذریعے شامل کیا جاتا ہے، عام طور پر ایک `<gazebo>` عنصر کے اندر، جسے اکثر XACRO (XML میکروز) کہا جاتا ہے زیادہ پیچیدہ ماڈلز کے لیے۔

**عام Gazebo ٹیگس**:
*   **`<gazebo reference="link_name">`**: ایک مخصوص لنک پر خصوصیات لاگو کرتا ہے۔
    *   `<material>`: Gazebo مخصوص میٹریل کی خصوصیات (جیسے، `Gazebo/Blue`)۔
    *   `<kp>`, `<kd>`: جوائینٹ سپرنگ اور ڈیمپنگ کوائف۔
    *   `<mu1>`, `<mu2>`: کالیژن سر فیسز کے لیے فریکشن کوائف۔
*   **`<plugin filename="libgazebo_ros_control.so">`**: Gazebo پلگ انز لوڈ کرتا ہے، جیسے `ros2_control` ہارڈ ویئر ایب سٹریکشن اور کنٹرولر مینجمنٹ کے لیے۔

**Gazebo توسیع کی مثال (تصور)**:
```xml
<robot name="my_robot">
  ...
  <link name="base_link">
    ...
  </link>

  <gazebo reference="base_link">
    <material>Gazebo/Orange</material>
    <mu1>0.2</mu1>
    <mu2>0.2</mu2>
  </gazebo>

  <joint name="shoulder_joint" type="revolute">
    ...
  </joint>

  <gazebo reference="shoulder_joint">
    <implicitSpringDamper>1</implicitSpringDamper>
    <kp>1000000.0</kp>
    <kd>100.0</kd>
    <fudgeFactor>0.0</fudgeFactor>
    <provideFeedback>true</provideFeedback>
  </gazebo>

  <gazebo>
    <plugin name="gazebo_ros2_control" filename="libgazebo_ros2_control.so">
      <parameters>$(find my_robot_controller)/config/my_robot_controller.yaml</parameters>
    </plugin>
  </gazebo>

</robot>
```

## عملی مشقیں

### مشق 1: ایک سادہ دو لنک ہیومنوائڈ بازو سیگمینٹ URDF تخلیق کریں
**مقصد**: ایک URDF فائل تخلیق کرنا جو ہیومنوائڈ کے لیے مناسب ایک سادہ دو لنک روبوٹ بازو سیگمینٹ کو ماڈل کرتا ہے۔

**ہدایات**:
1.  ایک نیا ROS 2 پیکج تخلیق کریں، مثلاً `humanoid_urdf_tutorial`، ایک `urdf` ذیلی ڈائریکٹری کے ساتھ۔
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_cmake humanoid_urdf_tutorial
    mkdir -p humanoid_urdf_tutorial/urdf
    ```
2.  `humanoid_urdf_tutorial/urdf/` کے اندر، `humanoid_arm.urdf` تخلیق کریں۔ اس فائل میں درج ذیل کی وضاحت ہونی چاہیے:
    *   ایک `base_link` (جیسے، شولڈر/ٹورسو کنکشن کی نمائندگی)۔
    *   ایک `shoulder_joint` قسم `revolute` کا، `base_link` کو `upper_arm_link` سے جوڑنا۔ اس کا `origin`, `axis`, اور `limit` کی وضاحت کریں (جیسے، Z-axis کے گرد -90 سے +90 ڈگری گردش)۔
    *   ایک `upper_arm_link` (جیسے، ایک سلنڈر)۔
    *   ایک `elbow_joint` قسم `revolute` کا، `upper_arm_link` کو `forearm_link` سے جوڑنا۔ اس کا `origin`, `axis`, اور `limit` کی وضاحت کریں (جیسے، Y-axis کے گرد -90 سے +90 ڈگری گردش)۔
    *   ایک `forearm_link` (جیسے، ایک اور سلنڈر)۔
3.  یقینی بنائیں کہ ہر لنک کے پاس منٹ `<visual>`, `<collision>`, اور `<inertial>` ٹیگس ہیں (سادہ باکسز/سلنڈرز، جگہ کے طور پر ماس/انیشیا)۔
4.  `humanoid_urdf_tutorial/CMakeLists.txt` اور `package.xml` کو URDF فائلوں کو درست طریقے سے انسٹال کرنے کے لیے اپ ڈیٹ کریں۔

**متوقع نتیجہ**:
ایک درست `humanoid_arm.urdf` فائل جسے URDF پارسرز کے ذریعے بغیر خامیوں کے پارس کیا جا سکے۔

### مشق 2: `rviz2` میں اپنے URDF کو ویژولائز اور انٹرایکٹ کریں
**مقصد**: `rviz2` میں تخلیق کردہ `humanoid_arm.urdf` کو ویژولائز کرنا اور اس کی جوائینٹس کے ساتھ انٹرایکٹ کرنا۔

**ہدایات**:
1.  اپنے `humanoid_urdf_tutorial` پیکج کو تعمیر کریں: `colcon build` ورک سپیس کے روٹ سے۔
2.  اپنے ورک سپیس سیٹ اپ فائلوں کو سورس کریں۔
3.  `rviz2` لانچ کریں۔
4.  `rviz2` میں، "RobotModel" ڈسپلے شامل کریں۔ اس کی خصوصیات میں، یقینی بنائیں کہ `Robot Description` ٹاپک درست طریقے سے کنفیگر کیا گیا ہے (عام طور پر `robot_description`)۔
5.  ایک `joint_state_publisher_gui` نوڈ لانچ کریں۔ آپ کو یہ یقینی بنانا ہوگا کہ `robot_description` پیرامیٹر کو آپ کے `humanoid_arm.urdf` کو لوڈ کرنے کے لیے سیٹ کیا گیا ہے ایک لانچ فائل یا کمانڈ لائن کے ذریعے۔ اس مشق کے لیے ایک سادہ طریقہ xacro اور robot_state_publisher استعمال کرنا ہے۔
    ```bash
    # مثال: آپ کو اس کے لیے ایک سادہ لانچ فائل لکھنے کی ضرورت ہوسکتی ہے
    # یا براہ راست URDF کو robot_state_publisher میں لوڈ کریں
    export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/ros2_ws/src/humanoid_urdf_tutorial
    ros2 run robot_state_publisher robot_state_publisher --ros-args -p robot_description:="$(cat $(ros2 pkg prefix humanoid_urdf_tutorial)/share/humanoid_urdf_tutorial/urdf/humanoid_arm.urdf)"
    ros2 run joint_state_publisher_gui joint_state_publisher_gui
    ```
6.  `joint_state_publisher_gui` ونڈو میں سلائیڈر کو مینوپولیٹ کریں اور `rviz2` میں بازو سیگمینٹ کی حرکت کو دیکھیں۔

**متوقع نتیجہ**:
*   `rviz2` میں آپ کے دو لنک بازو سیگمینٹ کی 3D ویژولائزیشن۔
*   بازو کی جوائینٹس (شولڈر، البو) کو GUI میں ان کے مطابق سلائیڈر کو ایڈجسٹ کرنے کے مطابق گردش کرنا چاہیے۔


## حوالہ جات / مزید مطالعہ
*   URDF جائزہ: [http://wiki.ros.org/urdf/Tutorials/](http://wiki.ros.org/urdf/Tutorials/)
*   ROS 2 URDF ٹیوٹوریل: [https://docs.ros.org/en/humble/Tutorials/Learning-ROS2-with-rqt-and-rviz2/The-robot_state_publisher-package.html](https://docs.ros.org/en/humble/Tutorials/Learning-ROS2-with-rqt-and-rviz2/The-robot_state_publisher-package.html)
*   Gazebo ROS 2 کنٹرول: [https://github.com/ros-simulation/gazebo_ros2_control](https://github.com/ros-simulation/gazebo_ros2_control)
*   XACRO ٹیوٹوریل: [http://wiki.ros.org/xacro/Tutorials](http://wiki.ros.org/xacro/Tutorials)
---
title: "URDF for Humanoids"
sidebar_position: 3
---

# URDF for Humanoids

## Learning Objectives
*   Understand the purpose and structure of URDF (Unified Robot Description Format) files.
*   Define `link` and `joint` elements and their attributes in URDF.
*   Create a basic URDF model for a simple robotic arm or humanoid limb.
*   Utilize visualization tools (e.g., `rviz2`) to display and debug URDF models.
*   Extend URDF with Gazebo-specific tags for simulation properties.

## Comprehensive Content

URDF (Unified Robot Description Format) is an XML format for describing the kinematic and dynamic properties of a robot. It is an essential tool in ROS 2 for defining the physical structure of a robot, including its links (rigid bodies) and joints (connections between links). For humanoid robotics, URDF is critical for accurately representing the complex human-like structure, enabling simulation, motion planning, and control.

### Introduction to URDF

A URDF file provides a complete description of a robot's physical characteristics, allowing software components to understand its geometry, inertial properties, and how its parts move relative to each other. This description is used by various ROS 2 tools for visualization, simulation, and control.

**Why URDF for Humanoids?**
Humanoid robots have many degrees of freedom and a complex kinematic chain. URDF allows developers to:
*   **Model Structure**: Define the torso, head, arms, legs, and their interconnections.
*   **Visualize**: See a 3D representation of the humanoid in `rviz2`.
*   **Simulate**: Incorporate the model into physics simulators like Gazebo.
*   **Control**: Use the kinematic and dynamic properties for motion planning and inverse kinematics.

### Core URDF Elements: `link` and `joint`

A URDF file is fundamentally composed of `<link>` and `<joint>` elements, all encapsulated within a root `<robot>` tag.

#### 1. `<link>` Element
A `<link>` represents a rigid body part of the robot. It describes the visual, inertial, and collision properties of that part.

**Key Attributes/Sub-elements of `<link>`**:
*   **`name` (required)**: Unique identifier for the link.
*   **`<visual>`**: Defines how the link appears (geometry, color, texture).
    *   `geometry`: Shape (box, cylinder, sphere, mesh).
    *   `material`: Color or texture.
    *   `origin`: Relative transform from the link's local origin to the visual geometry's origin.
*   **`<collision>`**: Defines the link's collision properties, used by physics engines for contact detection.
    *   `geometry`: Shape (often simplified from visual geometry for computational efficiency).
    *   `origin`: Relative transform.
*   **`<inertial>`**: Defines the link's mass properties (mass, center of mass, inertia matrix), crucial for dynamic simulation.
    *   `mass`: Mass of the link.
    *   `origin`: Center of mass relative to the link's local origin.
    *   `inertia`: 3x3 rotational inertia matrix (Ixx, Iyy, Izz, Ixy, Ixz, Iyz).

**Example `link` definition:**
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

#### 2. `<joint>` Element
A `<joint>` defines a connection between two links, specifying their kinematic relationship and any motion constraints. Joints connect a `parent` link to a `child` link.

**Key Attributes/Sub-elements of `<joint>`**:
*   **`name` (required)**: Unique identifier for the joint.
*   **`type` (required)**: Type of joint (e.g., `revolute`, `continuous`, `prismatic`, `fixed`, `floating`, `planar`).
    *   `revolute`: A hinge joint that rotates around a single axis, with a limited range.
    *   `continuous`: A hinge joint that rotates around a single axis, without limits.
    *   `prismatic`: A sliding joint that moves along a single axis, with limits.
    *   `fixed`: A rigid connection between two links (no motion).
*   **`<parent>`**: Specifies the name of the parent link.
*   **`<child>`**: Specifies the name of the child link.
*   **`<origin>`**: Defines the transform from the parent link's origin to the child link's origin when the joint is at its default position (0 for revolute/prismatic, or as defined by limits).
    *   `xyz`: Position offset.
    *   `rpy`: Roll, pitch, yaw rotation offset (in radians).
*   **`<axis>`**: Defines the axis of rotation for revolute/continuous joints or translation for prismatic joints.
    *   `xyz`: A vector indicating the axis in the joint frame.
*   **`<limit>`**: For `revolute` and `prismatic` joints, defines the upper and lower bounds of motion, velocity, and effort.
    *   `lower`, `upper`: Joint limits.
    *   `velocity`: Max velocity.
    *   `effort`: Max effort.

**Example `joint` definition:**
```xml
<joint name="shoulder_joint" type="revolute">
  <parent link="base_link"/>
  <child link="upper_arm_link"/>
  <origin xyz="0.3 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1.0"/>
</joint>
```

### Creating a Basic URDF Model (Conceptual Simple Arm)

Let's conceptualize a simple two-link robotic arm with a base, an upper arm, and a forearm.

```xml
<?xml version="1.0"?>
<robot name="simple_arm">

  <!-- Base Link -->
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

  <!-- Shoulder Joint -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_arm_link"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="0.5"/>
  </joint>

  <!-- Upper Arm Link -->
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

  <!-- Elbow Joint -->
  <joint name="elbow_joint" type="revolute">
    <parent link="upper_arm_link"/>
    <child link="forearm_link"/>
    <origin xyz="0 0 0.5" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="0.5"/>
  </joint>

  <!-- Forearm Link -->
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

### Visualization with `rviz2`
`rviz2` is the primary 3D visualization tool for ROS 2. It can display URDF models, sensor data, and planning outputs.

To view a URDF:
1.  Run a `robot_state_publisher` node that reads the URDF file and publishes the robot's joint states as transforms on the `/tf` topic.
2.  Launch `rviz2` and add the "RobotModel" display, subscribing to the `/tf` topic.

**Example commands**:
```bash
# In one terminal, navigate to your package containing the URDF (e.g., in a launch file)
ros2 launch urdf_tutorial display.launch.py model:=src/my_robot_description/urdf/simple_arm.urdf

# Or, manually start robot_state_publisher and joint_state_publisher_gui
# 1. Start robot_state_publisher (needs to be configured with your URDF path)
# ros2 run robot_state_publisher robot_state_publisher --ros-args -p robot_description:="$(cat /path/to/your/robot.urdf)"

# 2. Start joint_state_publisher_gui (for interactive joint manipulation)
ros2 run joint_state_publisher_gui joint_state_publisher_gui

# 3. Start rviz2
rviz2
```

### Extending URDF with Gazebo Tags

While URDF defines the robot's kinematics and basic dynamics, physics simulators like Gazebo require additional properties (e.g., motor characteristics, friction, sensor noise). These are added using non-standard XML tags within the URDF, typically within a `<gazebo>` element, often referred to as XACRO (XML Macros) for more complex models.

**Common Gazebo tags**:
*   **`<gazebo reference="link_name">`**: Applies properties to a specific link.
    *   `<material>`: Gazebo-specific material properties (e.g., `Gazebo/Blue`).
    *   `<kp>`, `<kd>`: Joint spring and damping coefficients.
    *   `<mu1>`, `<mu2>`: Friction coefficients for collision surfaces.
*   **`<plugin filename="libgazebo_ros_control.so">`**: Loads Gazebo plugins, such as `ros2_control` for hardware abstraction and controller management.

**Example Gazebo extension (concept)**:
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

## Practical Exercises

### Exercise 1: Create a Simple Two-Link Humanoid Arm Segment URDF
**Objective**: To create a URDF file that models a simplified two-link robotic arm segment, suitable for a humanoid.

**Instructions**:
1.  Create a new ROS 2 package, e.g., `humanoid_urdf_tutorial`, with a `urdf` subdirectory.
    ```bash
    cd ~/ros2_ws/src
    ros2 pkg create --build-type ament_cmake humanoid_urdf_tutorial
    mkdir -p humanoid_urdf_tutorial/urdf
    ```
2.  Inside `humanoid_urdf_tutorial/urdf/`, create `humanoid_arm.urdf`. This file should describe:
    *   A `base_link` (e.g., representing the shoulder/torso connection).
    *   A `shoulder_joint` of type `revolute`, connecting `base_link` to `upper_arm_link`. Define its `origin`, `axis`, and `limit` (e.g., -90 to +90 degrees rotation around Z-axis).
    *   An `upper_arm_link` (e.g., a cylinder).
    *   An `elbow_joint` of type `revolute`, connecting `upper_arm_link` to `forearm_link`. Define its `origin`, `axis`, and `limit` (e.g., -90 to +90 degrees rotation around Y-axis).
    *   A `forearm_link` (e.g., another cylinder).
3.  Ensure each link has minimal `<visual>`, `<collision>`, and `<inertial>` tags (simple boxes/cylinders, placeholder mass/inertia).
4.  Update `humanoid_urdf_tutorial/CMakeLists.txt` and `package.xml` to correctly install the `urdf` files.

**Expected Output**:
A valid `humanoid_arm.urdf` file that can be parsed without errors by URDF parsers.

### Exercise 2: Visualize and Interact with Your URDF in `rviz2`
**Objective**: To visualize the created `humanoid_arm.urdf` in `rviz2` and interact with its joints.

**Instructions**:
1.  Build your `humanoid_urdf_tutorial` package: `colcon build` from workspace root.
2.  Source your workspace setup files.
3.  Launch `rviz2`.
4.  In `rviz2`, add the "RobotModel" display. In its properties, ensure the `Robot Description` topic is correctly configured (typically `robot_description`).
5.  Launch a `joint_state_publisher_gui` node. You will need to make sure `robot_description` parameter is set up to load your `humanoid_arm.urdf` using a launch file or command line. A simple way for this exercise is to use `xacro` and `robot_state_publisher`.
    ```bash
    # Example: you might need to write a simple launch file for this
    # Or directly load the URDF into robot_state_publisher
    export ROS_PACKAGE_PATH=$ROS_PACKAGE_PATH:~/ros2_ws/src/humanoid_urdf_tutorial
    ros2 run robot_state_publisher robot_state_publisher --ros-args -p robot_description:="$(cat $(ros2 pkg prefix humanoid_urdf_tutorial)/share/humanoid_urdf_tutorial/urdf/humanoid_arm.urdf)"
    ros2 run joint_state_publisher_gui joint_state_publisher_gui
    ```
6.  Manipulate the sliders in the `joint_state_publisher_gui` window and observe the arm segment move in `rviz2`.

**Expected Output**:
*   A 3D visualization of your two-link arm segment in `rviz2`.
*   The arm joints (shoulder, elbow) should rotate interactively as you adjust their corresponding sliders in the GUI.


## References / Further Reading
*   URDF Overview: [http://wiki.ros.org/urdf/Tutorials/](http://wiki.ros.org/urdf/Tutorials/)
*   ROS 2 URDF Tutorial: [https://docs.ros.org/en/humble/Tutorials/Learning-ROS2-with-rqt-and-rviz2/The-robot_state_publisher-package.html](https://docs.ros.org/en/humble/Tutorials/Learning-ROS2-with-rqt-and-rviz2/The-robot_state_publisher-package.html)
*   Gazebo ROS 2 Control: [https://github.com/ros-simulation/gazebo_ros2_control](https://github.com/ros-simulation/gazebo_ros2_control)
*   XACRO Tutorial: [http://wiki.ros.org/xacro/Tutorials](http://wiki.ros.org/xacro/Tutorials)

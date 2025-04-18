
# **Choosing a Base Robot Model for Autonomous Navigation**

Before diving into autonomous navigation, the first step is to define a base robot model. There are many open-source robot models available, such as TurtleBot3, Husky, and Jackal. However, for this project, I have designed a custom four-wheeled URDF-based robot tailored to my specific requirements.

## 📌 **Sensors Integrated in the Robot**

To enable perception and navigation, the robot is equipped with the following sensors:
- **LIDAR**: Used for obstacle detection and SLAM (Simultaneous Localization and Mapping).
- **Depth Camera**: Provides 3D depth information to improve obstacle avoidance and terrain mapping.
- **Camera**: Captures visual data for potential object recognition or additional perception tasks.

---

# **Understanding Kinematics: The Motion Model of the Robot**

One of the most critical aspects of any robot is its kinematic model, which defines how the robot moves in response to control inputs. Kinematics is governed by mathematical equations involving velocities, wheel distances, and movement constraints.

For this project, I have implemented the **Differential Drive** kinematic model (sometimes referred to as skid-steering in certain contexts), which is well-suited for my robot design.

---

## 📌 **What is Differential Drive (Skid-Steering)?**

Differential drive, or skid-steering, is a locomotion mechanism used in tank-like robots, rovers, and tracked vehicles. Unlike traditional steering mechanisms where wheels rotate independently, differential drive robots change direction by applying different velocities to the wheels on either side.

### **Equations for Differential Drive:**

1. **Linear Velocity**: The forward or backward motion of the robot is calculated by the average speed of the left and right wheels:

   $$
   v = R_w \cdot \frac{\omega_R + \omega_L}{2}
   $$

   Where:
   - \( v \) = Linear velocity of the robot (m/s)
   - \( R_w \) = Wheel radius (m)
   - \( \omega_R \) = Angular velocity of the right wheel (rad/s)
   - \( \omega_L \) = Angular velocity of the left wheel (rad/s)

2. **Angular Velocity**: The turning motion of the robot is calculated by the difference in speed between the left and right wheels:

   $$
   \omega = R_w \cdot \frac{\omega_R - \omega_L}{W}
   $$

   Where:
   - \( \omega \) = Angular velocity of the robot (rad/s)
   - \( W \) = Distance between the left and right wheels (wheelbase)

   - **Moving Forward**: \( \omega_R = \omega_L \) → Robot moves straight.
   - **Turning Left**: \( \omega_R > \omega_L \) → Robot curves left.
   - **Turning Right**: \( \omega_L > \omega_R \) → Robot curves right.
   - **Rotating in Place**: \( \omega_R = -\omega_L \) → Robot spins without moving forward.

### **Turning Radius:**

The turning radius defines the smallest curve the robot can follow while turning instead of rotating in place, based on the speed difference between its wheels.

   $$
   R = \frac{W}{2} \cdot \left( \frac{\omega_R - \omega_L}{\omega_R + \omega_L} \right)
   $$

   Where:
   - \( R \) = Turning radius
   - \( W \) = Wheelbase
   - \( \omega_R, \omega_L \) = Angular velocities of the right and left wheels

#### **Behavior:**
- **Smaller radius**: Larger speed difference between the wheels.
- **Larger radius**: Smaller speed difference between the wheels.

This method allows the robot to pivot in place, making it highly maneuverable, especially in rough terrain. However, due to wheel slippage and friction, skid-steering requires more power than traditional differential drive robots.

---

## **Why Differential Drive (Skid-Steering) for This Project?**

- **Better maneuverability** in uneven terrain, ideal for off-road applications.
- **Simple mechanical design** with no need for steering actuators.
- Works well for **rovers** and robots operating in unstructured environments.

---

# **Sensor Integration**

## **LIDAR in Autonomous Robots**

In my project, I've used **LiDAR** (Light Detection and Ranging) to obtain distance measurements from the environment, which are crucial for tasks like mapping and obstacle detection. The LiDAR sensor is configured in a `lidar.xacro` file, which defines its physical properties and its relationship with other components of the robot.

### **Defining the LiDAR in URDF (Using Xacro)**

The LiDAR is attached to the robot's body with a **fixed joint**, meaning it stays in place and moves with the robot. The `lidar.xacro` file sets its position and connection to the robot, which is important for accurate placement in both simulations and real-world use.

### **Physical Appearance and Configuration**

The LiDAR's size, shape, and material are defined in the `xacro` file to make it look correct in the simulation (Gazebo). The file also includes collision properties so the LiDAR can interact with objects in the simulation. Inertial properties are set to simulate the sensor's weight and how it affects the robot’s movement.

### **Gazebo Simulation Plugin**

The file uses a plugin to simulate the LiDAR in Gazebo, which publishes distance data as LaserScan messages on the `/scan` topic. These messages are used by **RViz** or other systems to display the LiDAR data in 3D. In the real world, the LiDAR would still send LaserScan messages to ROS 2, but it would be collecting real distance data from its surroundings instead of a simulation.

---

## **Depth Camera Configuration in URDF (Using Xacro)**

### 1. **Defining the Depth Camera in URDF (Using Xacro)**

The **depth camera** is attached to the robot's chassis using a fixed joint, meaning it stays in place relative to the robot's body. The position of the camera is set using the origin tag in the `camera.xacro` file, which defines its location and orientation. This ensures the camera is placed accurately in both simulation and real-world scenarios.

### 2. **Physical Appearance and Configuration**

The camera's visual representation is defined in the `xacro` file using a **box geometry**, which represents its physical shape. The camera is visualized in the simulation with a blue material. Additionally, the camera link includes an optical joint to define its alignment and orientation in the simulation. This is important for correct sensor placement and ensuring proper data alignment during navigation.

### 3. **Gazebo Simulation Plugin**

The file includes a **Gazebo plugin** that simulates the camera sensor and publishes depth information. The depth camera is configured to provide depth data in a specified range (from 0.1 to 100 meters). It also includes properties such as horizontal field of view (FOV), image resolution, and the near and far clipping planes. These parameters define how the camera captures the environment. In real life, the depth camera would capture actual depth data from the physical world and send it to ROS 2 for processing, similar to how it works in simulation.

# SLAM Toolbox in ROS 2: Concepts and Workflow

## 🧭 ODOM (Odometry)

Odometry is the method used to estimate the robot’s current **pose**—its position and orientation—relative to a known starting point, often referred to as the **odom frame**.  
This is typically achieved through **wheel encoders** that measure how far each wheel has turned, allowing the system to infer the robot’s traveled distance and direction.

> ⚠️ Odometry alone is not always accurate. Over time, drift may occur due to wheel slippage or sensor inaccuracies.

---

## 📡 SCAN (Lidar Scanning)

The **scan** refers to laser data obtained from a **LiDAR sensor**.  
It represents distance measurements to surrounding obstacles and is crucial for:

- Obstacle detection  
- Environment mapping  
- Occupancy grid creation

This scan data enables the robot to perceive and react to its surroundings in real-time.

---

## 🔄 TRANSFORM

ROS uses **transforms** to relate data between different **coordinate frames**.  
Each robot component—such as sensors, chassis (`base_link`), or actuators—has its own local frame.

To unify all data into a common frame, ROS applies transformations which include:

- **Translation** — Position of one frame relative to another  
- **Rotation** — Orientation difference between two frames

This ensures all sensor data is coherent and correctly aligned for processing and visualization.

---

## 🧩 RobotStatePublisher

`RobotStatePublisher` is a ROS node that broadcasts **static transforms** between the robot’s fixed frames, such as:

- `base_link`
- `camera_link`
- `laser_frame`

These frames do not move relative to one another.  
This node helps visualization tools (like RViz) understand the robot’s internal structure and sensor locations.

---

## 📡 tf_broadcaster

The `tf_broadcaster` handles **dynamic transforms**, which change over time—for example, as the robot moves.  
It broadcasts transforms like:

- `odom` → `base_link`

This is critical for **tracking the robot's position in real time**, and ensures that every part of the system has access to up-to-date positional data.

---

## ⚙️ SLAM Toolbox Workflow

1. **Initialization**  
   - The SLAM Toolbox node starts.
   - It receives:
     - Odometry data from the `odom` frame.
     - Lidar scan data from the sensor.

2. **Odometry Transformation**  
   - The odometry is transformed from the `odom` frame to the `base_link` frame.
   - This gives the robot’s current pose relative to its starting point.

3. **Pose Estimation**  
   - A `Pose2D` object is created containing:
     - `x`, `y` position
     - `θ` orientation (theta)

4. **Scan and Pose Packaging**  
   - Pose and scan data are merged into a `PosedScan` message.
   - These are queued for processing.

5. **Scan Integration**  
   - An **AddScan** operation is applied to each `PosedScan` in the queue.
   - Scans are processed from oldest to newest.
   - The environment map is updated incrementally.

---

This workflow enables the robot to **build and maintain a map** of its surroundings while localizing itself within that map—an essential step for autonomous navigation using **ROS 2** and **SLAM Toolbox**.



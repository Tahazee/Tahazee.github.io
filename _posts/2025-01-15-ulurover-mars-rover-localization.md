---
layout: post
title: "Ulurover Mars Rover: Vision-Based Localization & EKF Sensor Fusion"
date: 2025-01-15 10:00:00 +0200
categories: [Robotics, Autonomous Systems]
tags: [ROS2, ORB-SLAM3, ZED2, EKF, Sensor Fusion, Autonomous Navigation, Python, C++]
author: Taha Zeeshan
---

# Ulurover Mars Rover: Autonomous Spatial Localization & Sensor Fusion

In planetary exploration robotics, accurate localization without GPS is a fundamental challenge. As Team Leader and Autonomous System Engineer for **Ulurover** (the Mars Rover Team in Bursa, Turkey), I led the design and implementation of an end-to-end spatial perception pipeline for our rover.

---

## 🎯 System Objectives

1. **GPS-Denied Localization**: Enable the rover to traverse unstructured terrain while maintaining high-confidence state estimates.
2. **Real-time Spatial Feature Extraction**: Process 3D stereo point clouds and keypoint feature matches at >20 FPS.
3. **Sensor Fusion via Extended Kalman Filter (EKF)**: Integrate visual odometry with high-frequency IMU telemetry to eliminate cumulative visual drift.
4. **Multidisciplinary Team Leadership**: Lead a 25+ engineer team spanning mechanical, electrical, and software sub-teams, securing **250k TL** in corporate sponsorships.

---

## 🏗️ Technical Architecture

### 1. Vision-Based SLAM with ORB-SLAM3 & ZED2
We selected the **ZED2 Stereo Camera** for hardware-synchronized stereo image feeds and built a custom ROS2 wrapper around **ORB-SLAM3**. 

- **Keypoint Extraction**: Extracted FAST corners and ORB descriptors across multiple scale levels.
- **Loop Closure**: Implemented visual bag-of-words (DBoW2) loop detection to fix drift over long outdoor trajectories.
- **Stereo Depth Matching**: Generated accurate dense depth maps for immediate terrain elevation mapping.

### 2. Sensor Fusion Engine (EKF)
Visual odometry alone can suffer from tracking loss during rapid rotation or in featureless environments (such as flat sand or bright sunlight). To solve this:
- We deployed an **Extended Kalman Filter (EKF)** using `robot_localization` in ROS2.
- High-rate IMU data (100 Hz angular velocity and linear acceleration) was combined with visual odometry pose estimates (20 Hz).
- Covariance matrices were continuously updated to weigh visual data when tracking confidence was high and trust IMU predictions during temporary vision dropouts.

```
       +--------------------+
       |  ZED2 Stereo Cam   |
       +---------+----------+
                 |
                 v
       +--------------------+      +--------------------+
       |     ORB-SLAM3      |      |     IMU Sensor     |
       |  Visual Odometry   |      |  (High-Freq 100Hz) |
       +---------+----------+      +---------+----------+
                 |                           |
                 +-------------+-------------+
                               |
                               v
                    +--------------------+
                    |  ROS2 EKF Node     |
                    | (State Estimation) |
                    +---------+----------+
                              |
                              v
                    +--------------------+
                    | Robot Navigation   |
                    |  & Path Planning   |
                    +--------------------+
```

---

## 📊 Key Results & Outcomes

- **State Estimation Drift**: Kept position error below 2.5% over 100-meter outdoor field navigation trials.
- **Sponsorship & Funding**: Secured **250,000 TL** in technical sponsorships, making Ulurover the highest-funded technical team at Bursa Uludag University.
- **Team Management**: Managed 25+ engineers, organizing sprint deliverables, system integration tests, and simulation benchmarks in Gazebo and real hardware.

---

## 🔮 Takeaways

Building autonomous navigation pipelines for rovers requires tight coupling between low-level hardware timing, sensor calibration, and high-level ROS2 software design. The combination of stereo visual SLAM and EKF sensor fusion provides a reliable blueprint for planetary rovers operating in challenging, unstructured environments.

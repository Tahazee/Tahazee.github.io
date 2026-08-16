---
layout: post
title: "Itech iGlasses: AI Wearable for Assistive Perception & NLP Interaction"
date: 2025-04-15 10:00:00 +0200
categories: [Computer Vision, Assistive Technology]
tags: [Computer Vision, Deep Learning, AI Wearables, NLP, Edge AI, Jetson Nano, PyTorch, Accessibility]
author: Taha Zeeshan
---

# Itech iGlasses: Smart Assistive Perception for Visually Impaired Users

Assistive devices can drastically transform daily mobility for visually impaired individuals. As Software Head and Computer Vision Engineer at **Itech**, I architected **iGlasses**—an AI smart wearable designed to detect real-world hazards, classify obstacles, and communicate dynamically via voice control.

The project secured **3rd Place and a 30,000 TL prize** at the **Youth Tech Begin Innovators 2025 Competition**.

---

## 💡 Core Vision & Objectives

1. **Multi-Class Obstacle Detection**: Detect overhead hazards, ground obstacles, stairs, vehicles, and pedestrians in real time.
2. **Low-Latency NLP Interaction**: Enable users to query their surroundings using voice commands (e.g., *"What is ahead of me?"*) with instant audio feedback.
3. **Edge Optimization**: Run high-accuracy deep learning models locally on low-power wearable hardware without depending on external cloud server latencies.

---

## 🔬 System Design & Innovations

### 1. Edge Computer Vision Pipeline
- Trained multi-class Convolutional Neural Networks (CNNs) using **PyTorch** and optimized using TensorRT for edge hardware (Jetson Orin Nano / Raspberry Pi).
- Integrated dual camera sensors (IMX219-83 stereo pair) for depth estimation and immediate proximity calculation.

### 2. Natural Language Processing (NLP) Interaction
- Designed a lightweight NLP engine for offline voice recognition and natural-sounding audio synthesis.
- Implemented a prioritized speech dispatcher: emergency hazard warnings override routine environmental descriptions immediately.

```
+--------------------------+
|  Camera & Sensor Inputs  |
+------------+-------------+
             |
             v
+--------------------------+
| TensorRT-Accelerated CNN |
|   (Obstacle Classifier)  |
+------------+-------------+
             |
             +----------------------------+
             |                            |
             v                            v
+--------------------------+  +--------------------------+
|  Proximity & Depth Calc  |  |   NLP Intent & Speech    |
+------------+-------------+  +-----------+--------------+
             |                            |
             +-------------+--------------+
                           |
                           v
              +--------------------------+
              |   Bone-Conduction Audio  |
              |     (User Alert)         |
              +--------------------------+
```

---

## 🏆 Awards & Recognition

- 🥉 **3rd Place Winner** at the **Youth Tech Begin Innovators 2025 Competition**.
- Awarded **30,000 TL** cash prize for technical innovation in smart assistive technology.

---

## ♿ Social Impact & Community Integration

Beyond the technical innovation, this project directly serves our commitment to accessibility: providing technical support and mobility assistance for local accessibility projects helping people with disabilities.

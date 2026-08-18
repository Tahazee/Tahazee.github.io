/* ==========================================
   TAHA // UNIVERSE - COSMIC GALAXY NEBULA ENGINE
   Photorealistic Space Backdrop, 3D Earth, & Domain Constellations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('universe-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020408, 0.0003);

  // Load Cosmic Galaxy Nebula Texture into Three.js Scene Background
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('assets/images/nebula_bg.png', (texture) => {
    scene.background = texture;
  });

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.set(0, 0, 700);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Cosmic Lighting matching Golden/Crimson Galaxy Core
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const coreLight = new THREE.PointLight(0xfbbf24, 3.0, 1200);
  coreLight.position.set(200, 100, 300);
  scene.add(coreLight);

  const cyanLight = new THREE.PointLight(0x00f2fe, 2.5, 1000);
  cyanLight.position.set(-400, -200, -100);
  scene.add(cyanLight);

  // ------------------------------------------
  // PROCEDURAL 3D EARTH MODEL
  // ------------------------------------------
  function createEarthTexture() {
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 1024;
    texCanvas.height = 512;
    const tctx = texCanvas.getContext('2d');

    tctx.fillStyle = '#040b1e';
    tctx.fillRect(0, 0, 1024, 512);

    tctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
    tctx.lineWidth = 1.5;
    for (let x = 0; x < 1024; x += 32) {
      tctx.beginPath();
      tctx.moveTo(x, 0);
      tctx.lineTo(x, 512);
      tctx.stroke();
    }
    for (let y = 0; y < 512; y += 32) {
      tctx.beginPath();
      tctx.moveTo(0, y);
      tctx.lineTo(1024, y);
      tctx.stroke();
    }

    tctx.fillStyle = 'rgba(0, 242, 254, 0.85)';
    for (let i = 0; i < 55; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 512;
      const cr = Math.random() * 70 + 25;
      tctx.beginPath();
      tctx.arc(cx, cy, cr, 0, Math.PI * 2);
      tctx.fill();
    }

    return new THREE.CanvasTexture(texCanvas);
  }

  const earthGeo = new THREE.SphereGeometry(80, 64, 64);
  const earthMat = new THREE.MeshStandardMaterial({
    map: createEarthTexture(),
    roughness: 0.3,
    metalness: 0.2,
    emissive: 0x040b1e,
    emissiveIntensity: 0.85
  });
  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  scene.add(earthMesh);

  // Outer Atmosphere Glow Mesh
  const atmosGeo = new THREE.SphereGeometry(86, 64, 64);
  const atmosMat = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.25,
    side: THREE.BackSide
  });
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  earthMesh.add(atmosMesh);

  // Orbiting Satellite Ring
  const ringGeo = new THREE.TorusGeometry(135, 1.6, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.5 });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  earthMesh.add(ringMesh);

  // ------------------------------------------
  // REAL ASTRONOMICAL STARFIELD PARTICLES
  // ------------------------------------------
  const spectralColors = [0x9bb0ff, 0xffffff, 0xfbbf24, 0xf43f5e, 0x00f2fe];
  const starCount = 3000;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const idx = i * 3;
    starPositions[idx] = (Math.random() - 0.5) * 3400;
    starPositions[idx + 1] = (Math.random() - 0.5) * 3400;
    starPositions[idx + 2] = (Math.random() - 0.5) * 3400;

    const colorHex = spectralColors[Math.floor(Math.random() * spectralColors.length)];
    const c = new THREE.Color(colorHex);
    starColors[idx] = c.r;
    starColors[idx + 1] = c.g;
    starColors[idx + 2] = c.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 2.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.95
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // ------------------------------------------
  // 5 MAIN 3D DOMAIN STARS
  // ------------------------------------------
  const domainData = [
    { id: 'experience', name: 'EXPERIENCE', x: 0, y: -260, z: 100, color: 0x818cf8 },
    { id: 'education', name: 'EDUCATION', x: -280, y: -80, z: -50, color: 0x6366f1 },
    { id: 'research', name: 'RESEARCH', x: 280, y: -80, z: -50, color: 0xc084fc },
    { id: 'projects', name: 'PROJECTS', x: -180, y: 220, z: 80, color: 0x00f2fe },
    { id: 'skills', name: 'SKILLS', x: 180, y: 220, z: 80, color: 0x10b981 }
  ];

  const domainMeshes = [];
  const interactiveObjects = [];

  domainData.forEach(data => {
    const geo = new THREE.SphereGeometry(16, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: data.color,
      emissive: data.color,
      emissiveIntensity: 0.95,
      roughness: 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(data.x, data.y, data.z);
    mesh.userData = { id: data.id, name: data.name, type: 'domain' };

    const pLight = new THREE.PointLight(data.color, 2.2, 320);
    mesh.add(pLight);

    const lineMat = new THREE.LineBasicMaterial({ color: data.color, transparent: true, opacity: 0.4 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      mesh.position
    ]);
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    scene.add(mesh);
    domainMeshes.push(mesh);
    interactiveObjects.push(mesh);
  });

  // ------------------------------------------
  // 3D SUB-NODES & IN-DEPTH CASE STUDIES
  // ------------------------------------------
  const subNodesData = [
    { 
      id: 'exp-ulurover', 
      domain: 'experience', 
      name: 'Ulurover Mars Rover Localization & EKF Sensor Fusion', 
      x: 0, y: -260, z: 220, 
      role: 'Team Leader & Autonomous Systems Engineer', 
      org: 'Ulurover (Mars Rover Team, Bursa, Turkey)', 
      date: 'Sept 2023 – Jan 2025', 
      desc: `
        <p>In planetary exploration robotics, accurate localization without GPS is a fundamental challenge. As Team Leader and Autonomous System Engineer for Ulurover, I architected an end-to-end spatial perception pipeline for our rover.</p>
        
        <div class="panel-section-title">Key Technical Accomplishments</div>
        <ul class="bullet-list">
          <li><strong>GPS-Denied Vision Localization:</strong> Implemented <strong>ORB-SLAM3</strong> coupled with <strong>ZED2 stereo vision</strong> for real-time 3D feature tracking and robust visual odometry in unstructured terrain.</li>
          <li><strong>EKF Sensor Fusion:</strong> Designed an Extended Kalman Filter node integrating 100Hz IMU telemetry with visual pose estimates, keeping total drift under 2.5% over 100m outdoor trials.</li>
          <li><strong>Engineering Team Leadership:</strong> Directed a multidisciplinary engineering team of 25+ members across software, electrical, and mechanical sub-teams.</li>
          <li><strong>Corporate Sponsorship Acquisition:</strong> Secured <strong>250,000 TL</strong> in technical sponsorships, making Ulurover the highest-funded technical team at the university.</li>
        </ul>
      `
    },
    { 
      id: 'exp-itech', 
      domain: 'experience', 
      name: 'Itech iGlasses – Assistive AI Wearable & NLP Voice Interaction', 
      x: 100, y: -320, z: 50, 
      role: 'Software Head & Computer Vision Lead', 
      org: 'Itech (Bursa, Turkey)', 
      date: 'Apr 2025 – Jan 2026', 
      desc: `
        <p>Assistive devices can transform mobility for visually impaired individuals. As Software Head at Itech, I architected iGlasses—an AI smart wearable designed to detect real-world hazards, classify obstacles, and communicate via offline voice interaction.</p>

        <div class="panel-section-title">System Architecture & Innovations</div>
        <ul class="bullet-list">
          <li><strong>Real-Time Scene Perception:</strong> Trained multi-class Convolutional Neural Networks (CNNs) using PyTorch and optimized inference via TensorRT on Jetson Orin Nano / Raspberry Pi targets.</li>
          <li><strong>Offline Speech & NLP Engine:</strong> Integrated lightweight NLP for instant voice commands (<em>"What is ahead of me?"</em>) with prioritized audio alerts for sudden hazards.</li>
          <li><strong>Award Recognition:</strong> Secured <strong>3rd Place and a 30,000 TL prize</strong> at the Youth Tech Begin Innovators 2025 Competition.</li>
        </ul>
      `
    },
    { 
      id: 'exp-tarimtek', 
      domain: 'experience', 
      name: 'TarimTek – Real-Time Agricultural Crop & Pest Detection', 
      x: -100, y: -320, z: 50, 
      role: 'Software Head & Computer Vision Engineer', 
      org: 'TarimTek (Bursa, Turkey)', 
      date: 'Jan 2024 – Oct 2025', 
      desc: `
        <p>Precision agriculture relies heavily on computer vision for early detection of crop pests. At TarimTek, I built an edge vision pipeline for real-time insect classification in outdoor field environments.</p>

        <div class="panel-section-title">Technical Solution</div>
        <ul class="bullet-list">
          <li><strong>YOLOv8 Fine-Tuning:</strong> Trained custom CNN-backed YOLOv8 object detection architectures for precision insect classification under complex outdoor lighting.</li>
          <li><strong>OpenCV Augmentation Pipeline:</strong> Curated custom datasets annotated using OpenCV with specialized histogram equalization and color jittering to withstand direct sunlight.</li>
          <li><strong>Edge Acceleration:</strong> Quantized model weights to FP16 format, sustaining high detection accuracy during active field operations.</li>
        </ul>
      `
    },
    { 
      id: 'prj-ros2-nav', 
      domain: 'projects', 
      name: 'ROS2 Autonomous Navigation & Nav2 Mapping Pipeline', 
      x: -180, y: 220, z: 200, 
      role: 'Robotics Software Architect', 
      org: 'Autonomous Systems Lab', 
      date: 'Active Research', 
      desc: `
        <p>Architected full-stack ROS2 navigation nodes including costmap generation, obstacle avoidance, global path planning (Nav2), and TF2 transform tree setups for mobile robotics platforms.</p>
        <ul class="bullet-list">
          <li>Integrated RpLidarA1 2D scanning with ZED2 stereo point cloud depth maps.</li>
          <li>Configured MAVROS and Pixhawk flight controller serial communication bridges.</li>
          <li>Benchmarked navigation performance in Gazebo physics simulation.</li>
        </ul>
      `
    }
  ];

  const subNodeMeshes = [];

  subNodesData.forEach(sub => {
    const geo = new THREE.SphereGeometry(7, 24, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.95
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(sub.x, sub.y, sub.z);
    mesh.userData = { ...sub, type: 'subnode' };

    scene.add(mesh);
    subNodeMeshes.push(mesh);
    interactiveObjects.push(mesh);
  });

  // ------------------------------------------
  // STATE MANAGEMENT & GSAP CAMERA TRANSITIONS
  // ------------------------------------------
  let currentState = 0;
  let hoveredObject = null;

  const landingOverlay = document.getElementById('landing-overlay');
  const earthInfoPanel = document.getElementById('earth-info-panel');
  const caseStudyOverlay = document.getElementById('case-study-overlay');
  const backHintBtn = document.getElementById('back-hint-btn');
  const navLinkBtns = document.querySelectorAll('.nav-link-btn');

  function flyCameraTo(targetPos, duration = 1.8) {
    if (typeof gsap !== 'undefined') {
      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: duration,
        ease: "power3.inOut"
      });
    } else {
      camera.position.set(targetPos.x, targetPos.y, targetPos.z);
    }
  }

  function setSceneState(state, domainId = null) {
    currentState = state;

    navLinkBtns.forEach(btn => {
      const d = btn.getAttribute('data-domain');
      if (d === domainId || (state === 0 && d === 'universe')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (state === 0) {
      flyCameraTo({ x: 0, y: 0, z: 700 }, 1.8);
      if (landingOverlay) landingOverlay.classList.remove('fade-out');
      if (earthInfoPanel) earthInfoPanel.classList.remove('active');
      if (caseStudyOverlay) caseStudyOverlay.classList.remove('active');
      if (backHintBtn) backHintBtn.style.display = 'none';
    } 
    else if (state === 1) {
      flyCameraTo({ x: 0, y: 0, z: 280 }, 1.8);
      if (landingOverlay) landingOverlay.classList.add('fade-out');
      if (earthInfoPanel) earthInfoPanel.classList.add('active');
      if (caseStudyOverlay) caseStudyOverlay.classList.remove('active');
      if (backHintBtn) backHintBtn.style.display = 'block';
    } 
    else if (state === 2) {
      flyCameraTo({ x: 0, y: 0, z: 650 }, 1.8);
      if (landingOverlay) landingOverlay.classList.add('fade-out');
      if (earthInfoPanel) earthInfoPanel.classList.remove('active');
      if (caseStudyOverlay) caseStudyOverlay.classList.remove('active');
      if (backHintBtn) backHintBtn.style.display = 'block';
    } 
    else if (state === 3 && domainId) {
      const targetStar = domainData.find(d => d.id === domainId);
      if (targetStar) {
        flyCameraTo({ x: targetStar.x, y: targetStar.y, z: targetStar.z + 180 }, 1.8);
      }
      if (landingOverlay) landingOverlay.classList.add('fade-out');
      if (earthInfoPanel) earthInfoPanel.classList.remove('active');
      if (backHintBtn) backHintBtn.style.display = 'block';
    }
  }

  // Raycasting Mouse Hover & Click
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveObjects);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (hoveredObject !== obj) {
        if (hoveredObject && typeof gsap !== 'undefined') {
          gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
        }
        hoveredObject = obj;
        if (typeof gsap !== 'undefined') {
          gsap.to(hoveredObject.scale, { x: 1.45, y: 1.45, z: 1.45, duration: 0.3 });
        }
        canvas.style.cursor = 'pointer';
      }
    } else {
      if (hoveredObject && typeof gsap !== 'undefined') {
        gsap.to(hoveredObject.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }
      hoveredObject = null;
      canvas.style.cursor = 'default';
    }
  });

  window.addEventListener('click', () => {
    if (hoveredObject) {
      const data = hoveredObject.userData;
      if (data.type === 'domain') {
        setSceneState(3, data.id);
      } else if (data.type === 'subnode') {
        openCaseStudy(data);
      }
    }
  });

  // Buttons & Controls
  const btnExplore = document.getElementById('btn-explore');
  if (btnExplore) btnExplore.addEventListener('click', () => setSceneState(1));

  if (backHintBtn) {
    backHintBtn.addEventListener('click', () => {
      if (caseStudyOverlay && caseStudyOverlay.classList.contains('active')) {
        caseStudyOverlay.classList.remove('active');
      } else if (currentState === 3) {
        setSceneState(2);
      } else if (currentState === 1 || currentState === 2) {
        setSceneState(0);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (caseStudyOverlay && caseStudyOverlay.classList.contains('active')) {
        caseStudyOverlay.classList.remove('active');
      } else if (currentState === 3) {
        setSceneState(2);
      } else if (currentState === 1 || currentState === 2) {
        setSceneState(0);
      }
    }
  });

  navLinkBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const domain = btn.getAttribute('data-domain');
      if (domain === 'universe') setSceneState(0);
      else if (domain === 'earth') setSceneState(1);
      else setSceneState(3, domain);
    });
  });

  function openCaseStudy(data) {
    const caseTitle = document.getElementById('case-title');
    const caseCategory = document.getElementById('case-category');
    const caseText = document.getElementById('case-text');

    if (caseTitle) caseTitle.textContent = data.name || data.role;
    if (caseCategory) caseCategory.textContent = data.org || 'CASE STUDY';
    if (caseText) caseText.innerHTML = data.desc;

    if (caseStudyOverlay) caseStudyOverlay.classList.add('active');
  }

  const caseCloseBtn = document.getElementById('case-close-btn');
  if (caseCloseBtn) {
    caseCloseBtn.addEventListener('click', () => {
      if (caseStudyOverlay) caseStudyOverlay.classList.remove('active');
    });
  }

  // Animation Loop with Star Twinkling Modulation
  let clockTime = 0;
  function animate() {
    requestAnimationFrame(animate);
    clockTime += 0.01;

    earthMesh.rotation.y += 0.003;
    starField.rotation.y += 0.0002;
    ringMesh.rotation.z += 0.005;

    if (starMat) {
      starMat.opacity = 0.85 + 0.15 * Math.sin(clockTime * 2.5);
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});

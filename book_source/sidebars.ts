import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Introduction',
    },
    {
      type: 'category',
      label: 'Module 1: Introduction to Physical AI',
      link: {
        type: 'doc',
        id: 'module-1-introduction-to-physical-ai/index',
      },
      items: [
        'module-1-introduction-to-physical-ai/foundations',
        'module-1-introduction-to-physical-ai/humanoid-robotics-landscape',
        'module-1-introduction-to-physical-ai/sensor-systems',
      ],
    },
    
    {
      type: 'category',
      label: 'Module 2: ROS 2 Fundamentals',
      link: {
        type: 'doc',
        id: 'module-2-ros2-fundamentals/index',
      },
      items: [
        'module-2-ros2-fundamentals/architecture-concepts',
        'module-2-ros2-fundamentals/nodes-topics-services-actions',
        'module-2-ros2-fundamentals/urdf-for-humanoids',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Gazebo & Simulation',
      link: {
        type: 'doc',
        id: 'module-3-gazebo-simulation/index',
      },
      items: [
        'module-3-gazebo-simulation/gazebo-environment',
        'module-3-gazebo-simulation/physics-simulation-sensors',
        'module-3-gazebo-simulation/unity-integration',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: NVIDIA Isaac Platform',
      link: {
        type: 'doc',
        id: 'module-4-nvidia-isaac-platform/index',
      },
      items: [
        'module-4-nvidia-isaac-platform/isaac-sim-ros',
        'module-4-nvidia-isaac-platform/vslam-navigation',
        'module-4-nvidia-isaac-platform/capstone-project',
      ],
    },
  ],
};

export default sidebars;

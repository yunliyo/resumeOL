import { useEffect, useState } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备或平板设备
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent);
      
      // 也可以通过屏幕宽度判断（桌面设备通常宽度 >= 768px）
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isTablet || isSmallScreen);
    };

    checkIsMobile();
    
    // 监听窗口大小变化
    const handleResize = () => {
      checkIsMobile();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-md mx-4 bg-white rounded-lg shadow-lg border">
        <div className="mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="mx-auto text-gray-400"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          请使用电脑浏览器访问
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          OpResume 是一个专为电脑设计的简历编辑器，为了获得最佳体验和完整功能，请使用电脑浏览器访问。
        </p>
        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500">
          <p>支持的浏览器：Edge、Chrome、Firefox、Opera、Safari 等现代浏览器</p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
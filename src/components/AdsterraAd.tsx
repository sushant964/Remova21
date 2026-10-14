import React, { useEffect, useRef } from 'react';

const createIframeSrcDoc = (key: string, width: number, height: number) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${key}',
      'format' : 'iframe',
      'height' : ${height},
      'width' : ${width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bauval.org/22/${key}"></script>
</body>
</html>`;

/**
 * Adsterra 300x250 Medium Rectangle Banner
 */
export const AdsterraBanner300x250: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
          Advertisement
        </span>
        <div className="w-[300px] h-[250px] overflow-hidden rounded-xl shadow-sm bg-slate-100 flex items-center justify-center">
          <iframe
            title="Adsterra 300x250 Banner"
            width={300}
            height={250}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            srcDoc={createIframeSrcDoc('65f4b323f45e0c3d53f65ef7c5b041ac', 300, 250)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Adsterra 728x90 Leaderboard Banner
 */
export const AdsterraBanner728x90: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center max-w-full">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
          Advertisement
        </span>
        <div className="w-[728px] max-w-full h-[90px] overflow-hidden rounded-xl shadow-sm bg-slate-100 flex items-center justify-center">
          <iframe
            title="Adsterra 728x90 Leaderboard Banner"
            width={728}
            height={90}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            srcDoc={createIframeSrcDoc('e746fd04a1d14a645f8941a02dabd0a9', 728, 90)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Adsterra 320x50 Mobile Leaderboard Banner
 */
export const AdsterraBanner320x50: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
          Advertisement
        </span>
        <div className="w-[320px] h-[50px] overflow-hidden rounded-xl shadow-sm bg-slate-100 flex items-center justify-center">
          <iframe
            title="Adsterra 320x50 Mobile Banner"
            width={320}
            height={50}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            srcDoc={createIframeSrcDoc('04e546cb89ecbe1432e40b9baaec8459', 320, 50)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Responsive Banner: 728x90 on Desktop/Tablet, 320x50 on Mobile
 */
export const AdsterraResponsiveBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      {/* Desktop & Tablet: 728x90 */}
      <div className="hidden sm:flex flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
          Advertisement
        </span>
        <div className="w-[728px] max-w-full h-[90px] overflow-hidden rounded-xl shadow-sm bg-slate-100 flex items-center justify-center">
          <iframe
            title="Adsterra 728x90 Banner"
            width={728}
            height={90}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            srcDoc={createIframeSrcDoc('e746fd04a1d14a645f8941a02dabd0a9', 728, 90)}
          />
        </div>
      </div>

      {/* Mobile devices: 320x50 */}
      <div className="flex sm:hidden flex-col items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1.5">
          Advertisement
        </span>
        <div className="w-[320px] h-[50px] overflow-hidden rounded-xl shadow-sm bg-slate-100 flex items-center justify-center">
          <iframe
            title="Adsterra 320x50 Banner"
            width={320}
            height={50}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            srcDoc={createIframeSrcDoc('04e546cb89ecbe1432e40b9baaec8459', 320, 50)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Adsterra Native Banner
 * <script async="async" data-cfasync="false" src="https://bauval.org/21/514a002c18ae22fcc798993c013310cf"></script>
 * <div id="container-514a002c18ae22fcc798993c013310cf"></div>
 */
export const AdsterraNativeBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'adsterra-native-script-514a002c';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://bauval.org/21/514a002c18ae22fcc798993c013310cf';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full my-6 flex flex-col items-center justify-center ${className}`}>
      <div className="w-full border border-slate-200/80 bg-slate-50/60 rounded-2xl p-3 sm:p-4 text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-2">
          Sponsored Recommendations
        </span>
        <div ref={containerRef} className="w-full min-h-[90px] flex items-center justify-center">
          <div id="container-514a002c18ae22fcc798993c013310cf" className="w-full" />
        </div>
      </div>
    </div>
  );
};

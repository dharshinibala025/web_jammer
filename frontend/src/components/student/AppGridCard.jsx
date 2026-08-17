import React from 'react';
import { 
  SiInstagram, 
  SiWhatsapp, 
  SiFacebook, 
  SiYoutube, 
  SiTelegram, 
  SiSnapchat, 
  SiX, 
  SiGooglemaps 
} from 'react-icons/si';
import { 
  FiSmartphone, 
  FiCamera, 
  FiFileText, 
  FiGrid, 
  FiLock, 
  FiCheckCircle 
} from 'react-icons/fi';

export const AppGridCard = ({ app, onClick }) => {
  const getAppIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'instagram':
        return <SiInstagram className="w-6 h-6 text-pink-600" />;
      case 'whatsapp':
        return <SiWhatsapp className="w-6 h-6 text-emerald-500" />;
      case 'facebook':
        return <SiFacebook className="w-6 h-6 text-blue-600" />;
      case 'youtube':
        return <SiYoutube className="w-6 h-6 text-rose-600" />;
      case 'telegram':
        return <SiTelegram className="w-6 h-6 text-sky-500" />;
      case 'snapchat':
        return <SiSnapchat className="w-6 h-6 text-amber-400" />;
      case 'twitter':
        return <SiX className="w-6 h-6 text-slate-900" />;
      case 'camera':
        return <FiCamera className="w-6 h-6 text-purple-600" />;
      case 'map-pin':
        return <SiGooglemaps className="w-6 h-6 text-emerald-600" />;
      case 'file-text':
        return <FiFileText className="w-6 h-6 text-blue-500" />;
      default:
        return <FiSmartphone className="w-6 h-6 text-slate-600" />;
    }
  };

  const isBlocked = app.blocked;
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } } : undefined}
      className={`relative p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        isClickable ? 'cursor-pointer' : ''
      } ${
        isBlocked
          ? 'bg-rose-50/40 border-rose-100 hover:border-rose-300 hover:shadow-md'
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-center p-2">
          {getAppIcon(app.icon)}
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center space-x-1 ${
            isBlocked
              ? 'bg-rose-100 text-rose-700 border border-rose-200'
              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
          }`}
        >
          {isBlocked ? (
            <>
              <FiLock className="w-3 h-3 text-rose-600" />
              <span>Blocked</span>
            </>
          ) : (
            <>
              <FiCheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Allowed</span>
            </>
          )}
        </span>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-bold text-slate-900 truncate">{app.name}</h4>
        <p className="text-xs font-medium text-slate-500 truncate">{app.category || 'Application'}</p>
      </div>
    </div>
  );
};

export default AppGridCard;

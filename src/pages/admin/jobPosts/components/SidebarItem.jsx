import React from 'react';
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";
import { useSidebar } from './Sidebar';


const SidebarItem = React.memo(function SidebarItem({ 
  icon, 
  text, 
  active = false, 
  alert = false, 
  onClick 
}) {
  const { expanded } = useSidebar();

  return (
    <li
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className={cn(
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group",
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600",
        expanded ? "rounded-md" : "w-12 h-12 rounded-[70%]"
      )}
      role="menuitem"
      tabIndex={0}
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span
        className={cn("overflow-hidden transition-all", 
          expanded ? "w-52 ml-3" : "w-0"
        )}
      >
        {text}
      </span>
      {alert && (
        <span 
          className={cn("absolute right-2 w-2 h-2 rounded bg-indigo-400",
            expanded ? "" : "top-2"
          )}
          aria-label="Alert"
        />
      )}
    </li>
  );
});

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  alert: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default React.memo(SidebarItem);

// src/components/RouteListener.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLayoutStore from "../store/layoutStore";

interface LayoutConfig {
  showNavBar: boolean;
  showBottomBar: boolean;
}

const routeLayouts: { [key: string]: LayoutConfig } = {
  "/": { showNavBar: true, showBottomBar: false },
  "/image-upload": { showNavBar: true, showBottomBar: false },
  "/login": { showNavBar: false, showBottomBar: false },
  "/detail": { showNavBar: true, showBottomBar: false },
  "/settings": { showNavBar: true, showBottomBar: true },
};

function RouteListener() {
  const location = useLocation();
  const setLayoutVisibility = useLayoutStore(
    (state) => state.setLayoutVisibility
  );

  useEffect(() => {
    // 현재 경로에 맞는 레이아웃 설정 찾기
    const currentPath = Object.keys(routeLayouts).find(
      (route) =>
        location.pathname === route || location.pathname.startsWith(route + "/")
    );

    // 해당 경로의 레이아웃 설정 적용 또는 기본값 적용
    if (currentPath) {
      setLayoutVisibility(routeLayouts[currentPath]);
    } else {
      setLayoutVisibility({ showNavBar: true, showBottomBar: true });
    }
  }, [location, setLayoutVisibility]);

  return null;
}

export default RouteListener;

import { useEffect, useState } from "react";

const TIER = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  MINIMAL: "minimal",
};

const isMobileOrTouch = () => {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const hasMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
    ua
  );
  const hasTouch =
    typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
  return hasMobileUA || hasTouch;
};

const detectWebGL = () => {
  if (typeof document === "undefined") {
    return { webglSupport: false, gpu: null };
  }

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) {
      return { webglSupport: false, gpu: null };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : null;

    return { webglSupport: true, gpu: renderer };
  } catch {
    return { webglSupport: false, gpu: null };
  }
};

const classifyTier = (hardware) => {
  const isSoftwareRenderer = /swiftshader|llvmpipe|software/i.test(
    hardware.gpu || ""
  );

  if (
    !hardware.webglSupport ||
    hardware.reducedMotion ||
    isSoftwareRenderer
  ) {
    return TIER.MINIMAL;
  }

  if (hardware.isMobile || hardware.cores <= 2 || hardware.memory <= 2) {
    return TIER.LOW;
  }

  if (hardware.cores <= 4 || hardware.memory <= 4) {
    return TIER.MEDIUM;
  }

  return TIER.HIGH;
};

export const useDevicePerformance = () => {
  const [state, setState] = useState({
    tier: "detecting",
    hardware: {
      cores:
        typeof navigator !== "undefined"
          ? navigator.hardwareConcurrency
          : undefined,
      memory:
        typeof navigator !== "undefined" ? navigator.deviceMemory : undefined,
      isMobile: false,
      dpr: typeof window !== "undefined" ? window.devicePixelRatio : undefined,
      reducedMotion: false,
      gpu: null,
      webglSupport: false,
    },
    isCapable: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const { webglSupport, gpu } = detectWebGL();

      const hardware = {
        cores: navigator.hardwareConcurrency,
        memory: navigator.deviceMemory,
        isMobile: isMobileOrTouch(),
        dpr: window.devicePixelRatio,
        reducedMotion,
        gpu,
        webglSupport,
      };

      const tier = classifyTier(hardware);
      const isCapable = tier === TIER.HIGH || tier === TIER.MEDIUM;

      setState({ tier, hardware, isCapable });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return state;
};

export default useDevicePerformance;

import { useEffect, useRef, useState } from "react";

export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return [ref, visible] as const;
}

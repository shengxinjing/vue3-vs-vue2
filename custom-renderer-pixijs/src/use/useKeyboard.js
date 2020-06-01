import { ref, onMounted, onUnmounted } from "../../../../src/index";
/**
 * 注册键盘事件
 */
export const useKeyboard = (map) => {
  const handleKeydown = (e) => {
    const callbackObj = map[e.code];
    if (callbackObj && callbackObj.keydown) callbackObj.keydown(e);
  };

  const handleKeyup = (e) => {
    const callbackObj = map[e.code];
    if (callbackObj && callbackObj.keyup) callbackObj.keyup(e);
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
  });
};

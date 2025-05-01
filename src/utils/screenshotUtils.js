import html2canvas from "html2canvas";

/**
 * Capture a screenshot of a DOM element
 * @param {React.RefObject} elementRef - React ref to the DOM element
 * @param {Object} options - html2canvas options
 * @returns {Promise<HTMLCanvasElement>} - Canvas element with the screenshot
 */
export const captureElementScreenshot = async (elementRef, options = {}) => {
  if (!elementRef.current) {
    throw new Error("Element reference is not available");
  }

  const defaultOptions = {
    scale: 2, // Higher quality
    useCORS: true,
    logging: false,
    allowTaint: true,
  };

  return html2canvas(elementRef.current, { ...defaultOptions, ...options });
};

/**
 * Share a screenshot with the Web Share API
 * @param {HTMLCanvasElement} canvas - Canvas element with the screenshot
 * @param {Object} shareData - Additional data for sharing
 * @returns {Promise<void>}
 */
export const shareScreenshot = async (canvas, shareData = {}) => {
  try {
    // Convert canvas to blob
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png", 0.9);
    });

    // Create file from blob
    const file = new File([blob], "screenshot.png", { type: "image/png" });

    // Prepare share data with file
    const data = {
      title: "Screenshot",
      ...shareData,
      files: [file],
    };

    // Check if Web Share API Level 2 (with files) is supported
    if (navigator.canShare && navigator.canShare(data)) {
      await navigator.share(data);
      return true;
    } 
    
    // Fallback to text-only sharing
    if (navigator.share) {
      const textOnlyData = {
        title: data.title,
        text: data.text,
      };
      await navigator.share(textOnlyData);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error sharing screenshot:", error);
    return false;
  }
};

/**
 * Download a canvas as an image file
 * @param {HTMLCanvasElement} canvas - Canvas element to download
 * @param {string} filename - Name of the file to download
 */
export const downloadCanvasAsImage = (canvas, filename = "screenshot.png") => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}; 
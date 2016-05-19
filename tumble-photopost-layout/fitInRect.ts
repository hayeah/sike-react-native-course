/**
 * Scale a rectangle so it fits within the bound of a maximum rectangle.
 *
 * @param maxRect The limiting boundary.
 * @param inputRect The rectangle to fit.
 * @return The fitted rectangle.
 */
export function fitInRect(maxRect: Size, inputRect: Size): Size {
  // maxWidth = width * scaleWidth
  const scaleWidth = maxRect.width / inputRect.width;
  const scaleHeight = maxRect.height / inputRect.height;

  if (scaleWidth < scaleHeight) {
    return {
      width: maxRect.width,
      height: Math.floor(inputRect.height * scaleWidth),
    };
  } else {
    return {
      width: Math.floor(inputRect.width * scaleHeight),
      height: maxRect.height,
    };
  }
}

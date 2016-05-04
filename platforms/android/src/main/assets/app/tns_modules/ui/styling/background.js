var utils = require("utils/utils");
var common = require("./background-common");
var types = require("utils/types");
var button;
var style;
function ensureLazyRequires() {
    if (!button) {
        button = require("ui/button");
    }
    if (!style) {
        style = require("./style");
    }
}
global.moduleMerge(common, exports);
var ad;
(function (ad) {
    Object.defineProperty(ad, "BorderDrawable", {
        get: function () {
            ensureBorderDrawable();
            return BorderDrawableClass;
        },
        configurable: true
    });
    var BorderDrawableClass;
    function ensureBorderDrawable() {
        if (BorderDrawableClass) {
            return;
        }
        var BorderDrawable = (function (_super) {
            __extends(BorderDrawable, _super);
            function BorderDrawable() {
                _super.call(this);
                this._density = utils.layout.getDisplayDensity();
                return global.__native(this);
            }
            Object.defineProperty(BorderDrawable.prototype, "borderWidth", {
                get: function () {
                    return this._borderWidth;
                },
                set: function (value) {
                    if (this._borderWidth !== value) {
                        this._borderWidth = value;
                        this.invalidateSelf();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BorderDrawable.prototype, "cornerRadius", {
                get: function () {
                    return this._cornerRadius;
                },
                set: function (value) {
                    if (this._cornerRadius !== value) {
                        this._cornerRadius = value;
                        this.invalidateSelf();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BorderDrawable.prototype, "borderColor", {
                get: function () {
                    return this._borderColor;
                },
                set: function (value) {
                    if (this._borderColor !== value) {
                        this._borderColor = value;
                        this.invalidateSelf();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BorderDrawable.prototype, "background", {
                get: function () {
                    return this._background;
                },
                set: function (value) {
                    if (this._background !== value) {
                        this._background = value;
                        this.invalidateSelf();
                    }
                },
                enumerable: true,
                configurable: true
            });
            BorderDrawable.prototype.draw = function (canvas) {
                var bounds = this.getBounds();
                var borderWidth = this._borderWidth * this._density;
                var halfBorderWidth = borderWidth / 2;
                var normalizedBorderAlpha = android.graphics.Color.alpha(this._borderColor) / 255;
                var backoffAntialias = Math.min(0.5, halfBorderWidth) * normalizedBorderAlpha;
                var backgroundBoundsF = new android.graphics.RectF(bounds.left + backoffAntialias, bounds.top + backoffAntialias, bounds.right - backoffAntialias, bounds.bottom - backoffAntialias);
                var outerRadius = this._cornerRadius * this._density;
                if (this.background.color && this.background.color.android) {
                    var backgroundColorPaint = new android.graphics.Paint();
                    backgroundColorPaint.setStyle(android.graphics.Paint.Style.FILL);
                    backgroundColorPaint.setColor(this.background.color.android);
                    backgroundColorPaint.setAntiAlias(true);
                    canvas.drawRoundRect(backgroundBoundsF, outerRadius, outerRadius, backgroundColorPaint);
                }
                if (this.background.image) {
                    var bitmap = this.background.image.android;
                    var params = this.background.getDrawParams(bounds.width(), bounds.height());
                    var transform = new android.graphics.Matrix();
                    if (params.sizeX > 0 && params.sizeY > 0) {
                        var scaleX = params.sizeX / bitmap.getWidth();
                        var scaleY = params.sizeY / bitmap.getHeight();
                        transform.setScale(scaleX, scaleY, 0, 0);
                    }
                    else {
                        params.sizeX = bitmap.getWidth();
                        params.sizeY = bitmap.getHeight();
                    }
                    transform.postTranslate(params.posX - backoffAntialias, params.posY - backoffAntialias);
                    var shader = new android.graphics.BitmapShader(bitmap, android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT);
                    shader.setLocalMatrix(transform);
                    var backgroundImagePaint = new android.graphics.Paint();
                    backgroundImagePaint.setShader(shader);
                    var imageWidth = params.repeatX ? bounds.width() : params.sizeX;
                    var imageHeight = params.repeatY ? bounds.height() : params.sizeY;
                    params.posX = params.repeatX ? 0 : params.posX;
                    params.posY = params.repeatY ? 0 : params.posY;
                    var supportsPathOp = android.os.Build.VERSION.SDK_INT >= 19;
                    if (supportsPathOp) {
                        var backgroundPath = new android.graphics.Path();
                        backgroundPath.addRoundRect(backgroundBoundsF, outerRadius, outerRadius, android.graphics.Path.Direction.CCW);
                        var backgroundNoRepeatPath = new android.graphics.Path();
                        backgroundNoRepeatPath.addRect(params.posX, params.posY, params.posX + imageWidth, params.posY + imageHeight, android.graphics.Path.Direction.CCW);
                        backgroundPath.op(backgroundNoRepeatPath, android.graphics.Path.Op.INTERSECT);
                        canvas.drawPath(backgroundPath, backgroundImagePaint);
                    }
                    else {
                        canvas.save();
                        canvas.clipRect(params.posX, params.posY, params.posX + imageWidth, params.posY + imageHeight);
                        canvas.drawRoundRect(backgroundBoundsF, outerRadius, outerRadius, backgroundImagePaint);
                        canvas.restore();
                    }
                }
                if (borderWidth > 0 && this._borderColor) {
                    var middleBoundsF = new android.graphics.RectF(bounds.left + halfBorderWidth, bounds.top + halfBorderWidth, bounds.right - halfBorderWidth, bounds.bottom - halfBorderWidth);
                    var borderPaint = new android.graphics.Paint();
                    borderPaint.setColor(this._borderColor);
                    borderPaint.setAntiAlias(true);
                    if (outerRadius <= 0) {
                        borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                        borderPaint.setStrokeWidth(borderWidth);
                        canvas.drawRect(middleBoundsF, borderPaint);
                    }
                    else if (outerRadius >= borderWidth) {
                        borderPaint.setStyle(android.graphics.Paint.Style.STROKE);
                        borderPaint.setStrokeWidth(borderWidth);
                        var middleRadius = Math.max(0, outerRadius - halfBorderWidth);
                        canvas.drawRoundRect(middleBoundsF, middleRadius, middleRadius, borderPaint);
                    }
                    else {
                        var borderPath = new android.graphics.Path();
                        var borderOuterBoundsF = new android.graphics.RectF(bounds.left, bounds.top, bounds.right, bounds.bottom);
                        borderPath.addRoundRect(borderOuterBoundsF, outerRadius, outerRadius, android.graphics.Path.Direction.CCW);
                        var borderInnerBoundsF = new android.graphics.RectF(bounds.left + borderWidth, bounds.top + borderWidth, bounds.right - borderWidth, bounds.bottom - borderWidth);
                        borderPath.addRect(borderInnerBoundsF, android.graphics.Path.Direction.CW);
                        borderPaint.setStyle(android.graphics.Paint.Style.FILL);
                        canvas.drawPath(borderPath, borderPaint);
                    }
                }
            };
            return BorderDrawable;
        }(android.graphics.drawable.ColorDrawable));
        BorderDrawableClass = BorderDrawable;
    }
    var SDK;
    function getSDK() {
        if (!SDK) {
            SDK = android.os.Build.VERSION.SDK_INT;
        }
        return SDK;
    }
    var _defaultBackgrounds = new Map();
    function onBackgroundOrBorderPropertyChanged(v) {
        var nativeView = v._nativeView;
        if (!nativeView) {
            return;
        }
        ensureBorderDrawable();
        ensureLazyRequires();
        var backgroundValue = v.style._getValue(style.backgroundInternalProperty);
        var borderWidth = v.borderWidth;
        var bkg = nativeView.getBackground();
        if (v instanceof button.Button && !types.isNullOrUndefined(bkg) && types.isFunction(bkg.setColorFilter) &&
            v.borderWidth === 0 && v.borderRadius === 0 &&
            types.isNullOrUndefined(v.style._getValue(style.backgroundImageProperty)) &&
            !types.isNullOrUndefined(v.style._getValue(style.backgroundColorProperty))) {
            var backgroundColor = bkg.backgroundColor = v.style._getValue(style.backgroundColorProperty).android;
            bkg.setColorFilter(backgroundColor, android.graphics.PorterDuff.Mode.SRC_IN);
            bkg.backgroundColor = backgroundColor;
        }
        else if (v.borderWidth !== 0 || v.borderRadius !== 0 || !backgroundValue.isEmpty()) {
            if (!(bkg instanceof BorderDrawableClass)) {
                bkg = new BorderDrawableClass();
                var viewClass = types.getClass(v);
                if (!(v instanceof button.Button) && !_defaultBackgrounds.has(viewClass)) {
                    _defaultBackgrounds.set(viewClass, nativeView.getBackground());
                }
                nativeView.setBackground(bkg);
            }
            bkg.borderWidth = v.borderWidth;
            bkg.cornerRadius = v.borderRadius;
            bkg.borderColor = v.borderColor ? v.borderColor.android : android.graphics.Color.TRANSPARENT;
            bkg.background = backgroundValue;
            if (getSDK() < 18) {
                nativeView.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
            }
            else {
                nativeView.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);
            }
        }
        else {
            if (v instanceof button.Button) {
                var nativeButton = new android.widget.Button(nativeView.getContext());
                nativeView.setBackground(nativeButton.getBackground());
            }
            else {
                var viewClass = types.getClass(v);
                if (_defaultBackgrounds.has(viewClass)) {
                    nativeView.setBackground(_defaultBackgrounds.get(viewClass));
                }
            }
            if (getSDK() < 18) {
                nativeView.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);
            }
        }
        var density = utils.layout.getDisplayDensity();
        nativeView.setPadding(Math.round((borderWidth + v.style.paddingLeft) * density), Math.round((borderWidth + v.style.paddingTop) * density), Math.round((borderWidth + v.style.paddingRight) * density), Math.round((borderWidth + v.style.paddingBottom) * density));
    }
    ad.onBackgroundOrBorderPropertyChanged = onBackgroundOrBorderPropertyChanged;
})(ad = exports.ad || (exports.ad = {}));

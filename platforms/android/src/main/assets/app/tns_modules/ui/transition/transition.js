var platform = require("platform");
var types = require("utils/types");
var trace = require("trace");
var lazy_1 = require("utils/lazy");
var _sdkVersion = lazy_1.default(function () { return parseInt(platform.device.sdkVersion); });
var _defaultInterpolator = lazy_1.default(function () { return new android.view.animation.AccelerateDecelerateInterpolator(); });
var ENTER_POPEXIT_TRANSITION = "ENTER_POPEXIT_TRANSITION";
var EXIT_POPENTER_TRANSITION = "EXIT_POPENTER_TRANSITION";
var COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS = "COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS";
var COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS = "COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS";
var enterFakeResourceId = -10;
var exitFakeResourceId = -20;
var popEnterFakeResourceId = -30;
var popExitFakeResourceId = -40;
var AndroidTransitionType;
(function (AndroidTransitionType) {
    AndroidTransitionType.enter = "enter";
    AndroidTransitionType.exit = "exit";
    AndroidTransitionType.popEnter = "popEnter";
    AndroidTransitionType.popExit = "popExit";
})(AndroidTransitionType = exports.AndroidTransitionType || (exports.AndroidTransitionType = {}));
function _clearForwardTransitions(fragment) {
    if (fragment[EXIT_POPENTER_TRANSITION]) {
        trace.write("Cleared EXIT_POPENTER_TRANSITION " + fragment[EXIT_POPENTER_TRANSITION] + " for " + fragment.getTag(), trace.categories.Transition);
        fragment[EXIT_POPENTER_TRANSITION] = undefined;
    }
    if (_sdkVersion() >= 21) {
        var exitTransition = fragment.getExitTransition();
        if (exitTransition) {
            trace.write("Cleared Exit " + exitTransition.getClass().getSimpleName() + " transition for " + fragment.getTag(), trace.categories.Transition);
            fragment.setExitTransition(null);
        }
        var reenterTransition = fragment.getReenterTransition();
        if (reenterTransition) {
            trace.write("Cleared Pop Enter " + reenterTransition.getClass().getSimpleName() + " transition for " + fragment.getTag(), trace.categories.Transition);
            fragment.setReenterTransition(null);
        }
    }
}
exports._clearForwardTransitions = _clearForwardTransitions;
function _setAndroidFragmentTransitions(navigationTransition, currentFragment, newFragment, fragmentTransaction) {
    var name;
    if (navigationTransition.name) {
        name = navigationTransition.name.toLowerCase();
    }
    var useLollipopTransition = name && (name.indexOf("slide") === 0 || name === "fade" || name === "explode") && _sdkVersion() >= 21;
    if (useLollipopTransition) {
        newFragment.setAllowEnterTransitionOverlap(true);
        newFragment.setAllowReturnTransitionOverlap(true);
        if (currentFragment) {
            currentFragment.setAllowEnterTransitionOverlap(true);
            currentFragment.setAllowReturnTransitionOverlap(true);
        }
        if (name.indexOf("slide") === 0) {
            var direction = name.substr("slide".length) || "left";
            switch (direction) {
                case "left":
                    var rightEdge = new android.transition.Slide(android.view.Gravity.RIGHT);
                    _setUpNativeTransition(navigationTransition, rightEdge);
                    _addNativeTransitionListener(newFragment, rightEdge);
                    newFragment.setEnterTransition(rightEdge);
                    if (currentFragment) {
                        var leftEdge_1 = new android.transition.Slide(android.view.Gravity.LEFT);
                        _setUpNativeTransition(navigationTransition, leftEdge_1);
                        _addNativeTransitionListener(currentFragment, leftEdge_1);
                        currentFragment.setExitTransition(leftEdge_1);
                    }
                    break;
                case "right":
                    var leftEdge = new android.transition.Slide(android.view.Gravity.LEFT);
                    _setUpNativeTransition(navigationTransition, leftEdge);
                    _addNativeTransitionListener(newFragment, leftEdge);
                    newFragment.setEnterTransition(leftEdge);
                    if (currentFragment) {
                        var rightEdge_1 = new android.transition.Slide(android.view.Gravity.RIGHT);
                        _setUpNativeTransition(navigationTransition, rightEdge_1);
                        _addNativeTransitionListener(currentFragment, rightEdge_1);
                        currentFragment.setExitTransition(rightEdge_1);
                    }
                    break;
                case "top":
                    var bottomEdge = new android.transition.Slide(android.view.Gravity.BOTTOM);
                    _setUpNativeTransition(navigationTransition, bottomEdge);
                    _addNativeTransitionListener(newFragment, bottomEdge);
                    newFragment.setEnterTransition(bottomEdge);
                    if (currentFragment) {
                        var topEdge_1 = new android.transition.Slide(android.view.Gravity.TOP);
                        _setUpNativeTransition(navigationTransition, topEdge_1);
                        _addNativeTransitionListener(currentFragment, topEdge_1);
                        currentFragment.setExitTransition(topEdge_1);
                    }
                    break;
                case "bottom":
                    var topEdge = new android.transition.Slide(android.view.Gravity.TOP);
                    _setUpNativeTransition(navigationTransition, topEdge);
                    _addNativeTransitionListener(newFragment, topEdge);
                    newFragment.setEnterTransition(topEdge);
                    if (currentFragment) {
                        var bottomEdge_1 = new android.transition.Slide(android.view.Gravity.BOTTOM);
                        _setUpNativeTransition(navigationTransition, bottomEdge_1);
                        _addNativeTransitionListener(currentFragment, bottomEdge_1);
                        currentFragment.setExitTransition(bottomEdge_1);
                    }
                    break;
            }
        }
        else if (name === "fade") {
            var fadeEnter = new android.transition.Fade(android.transition.Fade.IN);
            _setUpNativeTransition(navigationTransition, fadeEnter);
            _addNativeTransitionListener(newFragment, fadeEnter);
            newFragment.setEnterTransition(fadeEnter);
            var fadeReturn = new android.transition.Fade(android.transition.Fade.OUT);
            _setUpNativeTransition(navigationTransition, fadeReturn);
            _addNativeTransitionListener(newFragment, fadeReturn);
            newFragment.setReturnTransition(fadeReturn);
            if (currentFragment) {
                var fadeExit = new android.transition.Fade(android.transition.Fade.OUT);
                _setUpNativeTransition(navigationTransition, fadeExit);
                _addNativeTransitionListener(currentFragment, fadeExit);
                currentFragment.setExitTransition(fadeExit);
                var fadeReenter = new android.transition.Fade(android.transition.Fade.IN);
                _setUpNativeTransition(navigationTransition, fadeReenter);
                _addNativeTransitionListener(currentFragment, fadeReenter);
                currentFragment.setReenterTransition(fadeReenter);
            }
        }
        else if (name === "explode") {
            var explodeEnter = new android.transition.Explode();
            _setUpNativeTransition(navigationTransition, explodeEnter);
            _addNativeTransitionListener(newFragment, explodeEnter);
            newFragment.setEnterTransition(explodeEnter);
            if (currentFragment) {
                var explodeExit = new android.transition.Explode();
                _setUpNativeTransition(navigationTransition, explodeExit);
                _addNativeTransitionListener(currentFragment, explodeExit);
                currentFragment.setExitTransition(explodeExit);
            }
        }
        return;
    }
    var transition;
    if (name) {
        if (name.indexOf("slide") === 0) {
            var slideTransitionModule = require("ui/transition/slide-transition");
            var direction = name.substr("slide".length) || "left";
            transition = new slideTransitionModule.SlideTransition(direction, navigationTransition.duration, navigationTransition.curve);
        }
        else if (name === "fade") {
            var fadeTransitionModule = require("ui/transition/fade-transition");
            transition = new fadeTransitionModule.FadeTransition(navigationTransition.duration, navigationTransition.curve);
        }
        else if (name.indexOf("flip") === 0) {
            var flipTransitionModule = require("ui/transition/flip-transition");
            var direction = name.substr("flip".length) || "right";
            transition = new flipTransitionModule.FlipTransition(direction, navigationTransition.duration, navigationTransition.curve);
        }
    }
    else {
        transition = navigationTransition.instance;
    }
    if (transition) {
        newFragment[ENTER_POPEXIT_TRANSITION] = transition;
        if (currentFragment) {
            currentFragment[EXIT_POPENTER_TRANSITION] = transition;
        }
        fragmentTransaction.setCustomAnimations(enterFakeResourceId, exitFakeResourceId, popEnterFakeResourceId, popExitFakeResourceId);
    }
}
exports._setAndroidFragmentTransitions = _setAndroidFragmentTransitions;
function _setUpNativeTransition(navigationTransition, nativeTransition) {
    if (navigationTransition.duration) {
        nativeTransition.setDuration(navigationTransition.duration);
    }
    if (navigationTransition.curve) {
        var animation = require("ui/animation");
        var interpolator = animation._resolveAnimationCurve(navigationTransition.curve);
        nativeTransition.setInterpolator(interpolator);
    }
    else {
        nativeTransition.setInterpolator(_defaultInterpolator());
    }
}
function _onFragmentShown(fragment, isBack) {
    var transitionType = isBack ? "Pop Enter" : "Enter";
    var relevantTransition = isBack ? EXIT_POPENTER_TRANSITION : ENTER_POPEXIT_TRANSITION;
    if (fragment[relevantTransition]) {
        trace.write(fragment.getTag() + " has been shown when going " + (isBack ? "back" : "forward") + ", but there is " + transitionType + " " + fragment[relevantTransition] + ". Will complete page addition when transition ends.", trace.categories.Transition);
        fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS] = { isBack: isBack };
    }
    else if (_sdkVersion() >= 21) {
        var nativeTransition = isBack ? fragment.getReenterTransition() : fragment.getEnterTransition();
        if (nativeTransition) {
            trace.write(fragment.getTag() + " has been shown when going " + (isBack ? "back" : "forward") + ", but there is " + transitionType + " " + nativeTransition.getClass().getSimpleName() + " transition. Will complete page addition when transition ends.", trace.categories.Transition);
            fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS] = { isBack: isBack };
        }
    }
    if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS] === undefined) {
        _completePageAddition(fragment, isBack, true);
    }
}
exports._onFragmentShown = _onFragmentShown;
function _onFragmentHidden(fragment, isBack) {
    var transitionType = isBack ? "Pop Exit" : "Exit";
    var relevantTransition = isBack ? ENTER_POPEXIT_TRANSITION : EXIT_POPENTER_TRANSITION;
    if (fragment[relevantTransition]) {
        trace.write(fragment.getTag() + " has been hidden when going " + (isBack ? "back" : "forward") + ", but there is " + transitionType + " " + fragment[relevantTransition] + ". Will complete page removal when transition ends.", trace.categories.Transition);
        fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS] = true;
    }
    else if (_sdkVersion() >= 21) {
        var nativeTransition = isBack ? fragment.getReturnTransition() : fragment.getExitTransition();
        if (nativeTransition) {
            trace.write(fragment.getTag() + " has been hidden when going " + (isBack ? "back" : "forward") + ", but there is " + transitionType + " " + nativeTransition.getClass().getSimpleName() + " transition. Will complete page removal when transition ends.", trace.categories.Transition);
            fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS] = true;
        }
    }
    if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS] === undefined) {
        _completePageRemoval(fragment, true, isBack);
    }
}
exports._onFragmentHidden = _onFragmentHidden;
function _completePageAddition(fragment, isBack, force) {
    if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS] || force) {
        fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS] = undefined;
        var frame = fragment.frame;
        var entry = fragment.entry;
        var page = entry.resolvedPage;
        frame._currentEntry = entry;
        page.onNavigatedTo(isBack);
        frame._processNavigationQueue(page);
        trace.write("ADDITION of " + page + " completed", trace.categories.Transition);
    }
}
function _completePageRemoval(fragment, force, isBack) {
    if (force === void 0) { force = false; }
    if (isBack === void 0) { isBack = false; }
    if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS] || force) {
        fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS] = undefined;
        var frame = fragment.frame;
        var entry = fragment.entry;
        var page = entry.resolvedPage;
        if (page.frame) {
            frame._removeView(page);
            page.onNavigatedFrom(isBack);
        }
        trace.write("REMOVAL of " + page + " completed", trace.categories.Transition);
    }
}
function _addNativeTransitionListener(fragment, nativeTransition) {
    var transitionListener = new android.transition.Transition.TransitionListener({
        onTransitionCancel: function (transition) {
            trace.write("CANCEL " + nativeTransition + " transition for " + fragment, trace.categories.Transition);
            if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS]) {
                _completePageRemoval(fragment);
            }
            if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS]) {
                _completePageAddition(fragment, fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS].isBack);
            }
        },
        onTransitionEnd: function (transition) {
            trace.write("END " + nativeTransition + " transition for " + fragment, trace.categories.Transition);
            if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS]) {
                _completePageRemoval(fragment);
            }
            if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS]) {
                _completePageAddition(fragment, fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS].isBack);
            }
        },
        onTransitionPause: function (transition) {
            trace.write("PAUSE " + nativeTransition + " transition for " + fragment, trace.categories.Transition);
        },
        onTransitionResume: function (transition) {
            trace.write("RESUME " + nativeTransition + " transition for " + fragment, trace.categories.Transition);
        },
        onTransitionStart: function (transition) {
            trace.write("START " + nativeTransition + " transition for " + fragment, trace.categories.Transition);
        }
    });
    nativeTransition.addListener(transitionListener);
}
function _onFragmentCreateAnimator(fragment, nextAnim) {
    var transitionType;
    switch (nextAnim) {
        case enterFakeResourceId:
            transitionType = AndroidTransitionType.enter;
            break;
        case exitFakeResourceId:
            transitionType = AndroidTransitionType.exit;
            break;
        case popEnterFakeResourceId:
            transitionType = AndroidTransitionType.popEnter;
            break;
        case popExitFakeResourceId:
            transitionType = AndroidTransitionType.popExit;
            break;
    }
    var transition;
    switch (transitionType) {
        case AndroidTransitionType.enter:
        case AndroidTransitionType.popExit:
            transition = fragment[ENTER_POPEXIT_TRANSITION];
            break;
        case AndroidTransitionType.exit:
        case AndroidTransitionType.popEnter:
            transition = fragment[EXIT_POPENTER_TRANSITION];
            break;
    }
    var animator;
    if (transition) {
        animator = transition.createAndroidAnimator(transitionType);
        var transitionListener = new android.animation.Animator.AnimatorListener({
            onAnimationStart: function (animator) {
                trace.write("START " + transitionType + " " + transition + " for " + fragment.getTag(), trace.categories.Transition);
            },
            onAnimationRepeat: function (animator) {
                trace.write("REPEAT " + transitionType + " " + transition + " for " + fragment.getTag(), trace.categories.Transition);
            },
            onAnimationEnd: function (animator) {
                trace.write("END " + transitionType + " " + transition, trace.categories.Transition);
                if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS]) {
                    _completePageRemoval(fragment);
                }
                if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS]) {
                    _completePageAddition(fragment, fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS].isBack);
                }
            },
            onAnimationCancel: function (animator) {
                trace.write("CANCEL " + transitionType + " " + transition + " for " + fragment.getTag(), trace.categories.Transition);
                if (fragment[COMPLETE_PAGE_REMOVAL_WHEN_TRANSITION_ENDS]) {
                    _completePageRemoval(fragment);
                }
                if (fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS]) {
                    _completePageAddition(fragment, fragment[COMPLETE_PAGE_ADDITION_WHEN_TRANSITION_ENDS].isBack);
                }
            }
        });
        animator.addListener(transitionListener);
    }
    return animator;
}
exports._onFragmentCreateAnimator = _onFragmentCreateAnimator;
var transitionId = 0;
var Transition = (function () {
    function Transition(duration, curve) {
        this._duration = duration;
        if (curve) {
            var animation = require("ui/animation");
            this._interpolator = animation._resolveAnimationCurve(curve);
        }
        else {
            this._interpolator = _defaultInterpolator();
        }
        this._id = transitionId++;
    }
    Transition.prototype.getDuration = function () {
        return this._duration;
    };
    Transition.prototype.getCurve = function () {
        return this._interpolator;
    };
    Transition.prototype.animateIOSTransition = function (containerView, fromView, toView, operation, completion) {
        throw new Error("Abstract method call");
    };
    Transition.prototype.createAndroidAnimator = function (transitionType) {
        throw new Error("Abstract method call");
    };
    Transition.prototype.toString = function () {
        return types.getClass(this) + "@" + this._id;
    };
    return Transition;
}());
exports.Transition = Transition;

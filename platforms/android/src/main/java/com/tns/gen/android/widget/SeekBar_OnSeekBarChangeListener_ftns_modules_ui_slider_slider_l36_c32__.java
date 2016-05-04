package com.tns.gen.android.widget;

public class SeekBar_OnSeekBarChangeListener_ftns_modules_ui_slider_slider_l36_c32__ implements android.widget.SeekBar.OnSeekBarChangeListener {
	public SeekBar_OnSeekBarChangeListener_ftns_modules_ui_slider_slider_l36_c32__() {
		com.tns.Runtime.initInstance(this);
	}

	public void onProgressChanged(android.widget.SeekBar param_0, int param_1, boolean param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onProgressChanged", void.class, args);
	}

	public void onStartTrackingTouch(android.widget.SeekBar param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onStartTrackingTouch", void.class, args);
	}

	public void onStopTrackingTouch(android.widget.SeekBar param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onStopTrackingTouch", void.class, args);
	}

}

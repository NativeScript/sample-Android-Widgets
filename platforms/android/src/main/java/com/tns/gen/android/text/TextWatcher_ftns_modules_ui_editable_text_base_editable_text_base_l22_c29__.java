package com.tns.gen.android.text;

public class TextWatcher_ftns_modules_ui_editable_text_base_editable_text_base_l22_c29__ implements android.text.TextWatcher {
	public TextWatcher_ftns_modules_ui_editable_text_base_editable_text_base_l22_c29__() {
		com.tns.Runtime.initInstance(this);
	}

	public void beforeTextChanged(java.lang.CharSequence param_0, int param_1, int param_2, int param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "beforeTextChanged", void.class, args);
	}

	public void onTextChanged(java.lang.CharSequence param_0, int param_1, int param_2, int param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onTextChanged", void.class, args);
	}

	public void afterTextChanged(android.text.Editable param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "afterTextChanged", void.class, args);
	}

}

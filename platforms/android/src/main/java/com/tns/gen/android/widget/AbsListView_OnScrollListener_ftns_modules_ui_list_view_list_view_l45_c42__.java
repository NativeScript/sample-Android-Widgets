package com.tns.gen.android.widget;

public class AbsListView_OnScrollListener_ftns_modules_ui_list_view_list_view_l45_c42__ implements android.widget.AbsListView.OnScrollListener {
	public AbsListView_OnScrollListener_ftns_modules_ui_list_view_list_view_l45_c42__() {
		com.tns.Runtime.initInstance(this);
	}

	public void onScrollStateChanged(android.widget.AbsListView param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onScrollStateChanged", void.class, args);
	}

	public void onScroll(android.widget.AbsListView param_0, int param_1, int param_2, int param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onScroll", void.class, args);
	}

}

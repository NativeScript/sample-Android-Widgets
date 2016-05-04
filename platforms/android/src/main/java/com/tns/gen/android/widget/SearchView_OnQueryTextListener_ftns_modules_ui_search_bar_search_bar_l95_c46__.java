package com.tns.gen.android.widget;

public class SearchView_OnQueryTextListener_ftns_modules_ui_search_bar_search_bar_l95_c46__ implements android.widget.SearchView.OnQueryTextListener {
	public SearchView_OnQueryTextListener_ftns_modules_ui_search_bar_search_bar_l95_c46__() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onQueryTextSubmit(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextSubmit", boolean.class, args);
	}

	public boolean onQueryTextChange(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onQueryTextChange", boolean.class, args);
	}

}

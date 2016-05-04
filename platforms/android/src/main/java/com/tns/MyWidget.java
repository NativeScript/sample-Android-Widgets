package com.tns;

@com.tns.JavaScriptImplementation(javaScriptFile = "./myWidgetClass.js")
public class MyWidget extends android.appwidget.AppWidgetProvider implements com.tns.NativeScriptHashCodeProvider {
	public MyWidget(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onUpdate(android.content.Context param_0, android.appwidget.AppWidgetManager param_1, int[] param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onUpdate", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}

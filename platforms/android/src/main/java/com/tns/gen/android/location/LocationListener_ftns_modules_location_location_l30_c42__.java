package com.tns.gen.android.location;

public class LocationListener_ftns_modules_location_location_l30_c42__ implements android.location.LocationListener {
	public LocationListener_ftns_modules_location_location_l30_c42__() {
		com.tns.Runtime.initInstance(this);
	}

	public void onLocationChanged(android.location.Location param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onLocationChanged", void.class, args);
	}

	public void onStatusChanged(java.lang.String param_0, int param_1, android.os.Bundle param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onStatusChanged", void.class, args);
	}

	public void onProviderEnabled(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onProviderEnabled", void.class, args);
	}

	public void onProviderDisabled(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onProviderDisabled", void.class, args);
	}

}

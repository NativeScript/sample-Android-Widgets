(function () {
    // yay for JavaScript closures!
    var taps = -1;
    var rng = new java.util.Random();
    android.appwidget.AppWidgetProvider.extend("com.tns.MyWidget", {
        // is called each time the widget is added to the homescreen, or update ticks
        onUpdate: function (context, appWidgetManager, appWidgetIds) {
            console.log("Update called!");
            // gets the number of instances of the same widget on the homescreen
            var appWidgetsLen = appWidgetIds.length;

            taps += 1;

            // for each widget - update - we want them to be consistent
            for (let i = 0; i < appWidgetsLen; i++) {
                updateWidget(context, appWidgetManager, appWidgetIds, appWidgetIds[i]);
            }
        }
    });

    function updateWidget(context, appWidgetManager, appWidgetIds, widgetId) {
        var text = taps.toString();

        // retrieve our layout and all its views
       
        // const context = Application.android.context;
        let R = context.getResources();
        var views = new android.widget.RemoteViews(context.getPackageName(), R.getIdentifier("my_widget", "layout", context.getPackageName()));
    
        views.setTextViewText(R.getIdentifier("taps_text", "id", context.getPackageName()), text);
       
        var intent = new android.content.Intent(context, com.tns.MyWidget.class);
        intent.setAction(android.appwidget.AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        intent.putExtra(android.appwidget.AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);

        var startAppIntent = new android.content.Intent(context, com.tns.NativeScriptActivity.class); // the activity defined in AndroidManifest
        startAppIntent.putExtra(android.appwidget.AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);

        var pI = android.app.PendingIntent.getBroadcast(context, 0, intent, android.app.PendingIntent.FLAG_UPDATE_CURRENT);
        var pI2 = android.app.PendingIntent.getActivity(context, 0, startAppIntent, android.app.PendingIntent.FLAG_UPDATE_CURRENT);

        views.setOnClickPendingIntent(R.getIdentifier("tap_button", "id", context.getPackageName()), pI);
        views.setOnClickPendingIntent(R.getIdentifier("taps_image", "id", context.getPackageName()), pI2);

        appWidgetManager.updateAppWidget(widgetId, views);
    }
})();
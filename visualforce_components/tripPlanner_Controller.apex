global class tripPlanner_Controller {

    @RemoteAction
    global static void saveTrip(String j){
        system.debug(j);
        savePageView(j);
    }

    @future
    public static void savePageView(String j){
        pageView w = (pageView)JSON.deserialize(j,pageView.class);
        Pageview__c pv = new Pageview__c();
        pv.Origin__c = w.origin;
        pv.Destination__c = w.destination;
        pv.Type__c = w.type;
        pv.Date__c = w.d;
        pv.Time__c = w.t;
        insert pv;
    }

    global class pageView {
        global String origin;
        global String destination;
        global String type;
        global String d;
        global String t;
    }
}
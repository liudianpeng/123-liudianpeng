package utils.Spider;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

/**
 * Created by Peng on 2016/8/5.
 */
public class UrlTables {
    private static Set<String> visitedUrlSet = new HashSet();
    private static LinkedList unvisitedUrlSet = new LinkedList();

    public static Set getVisitedUrl() {
        return visitedUrlSet;
    }

    public static void setVisitedUrl(Set visitedUrl) {
        UrlTables.visitedUrlSet = visitedUrl;
    }

    public static LinkedList getUnvisitedUrl() {
        return unvisitedUrlSet;
    }

    public static void setUnvisitedUrl(LinkedList unvisitedUrl) {
        UrlTables.unvisitedUrlSet = unvisitedUrl;
    }

    public static void addToVisitedUrlSet(String url) {
        visitedUrlSet.add(url);
    }

    public static boolean IsUnvisitedUrlSetEmpty() {
        boolean isEmpty = false;
        if (unvisitedUrlSet.isEmpty()) {
            isEmpty = true;
        }
        return isEmpty;
    }

    public static void addToUnvisitedUrlSet(Set<String> urls) {
        for (String url : urls) {
            if (!isVisited(url)) {
                unvisitedUrlSet.add(url);
            }
        }
    }

    public static boolean isVisited(String url) {
        boolean isVisited = false;
        for (String visitedUrl : visitedUrlSet) {
            if (visitedUrl.equals(url)) {
                isVisited = true;
            }
        }
        return isVisited;
    }

    public static String getFirstFromVisitedUrSet() {
        String url = unvisitedUrlSet.getFirst().toString();
        unvisitedUrlSet.removeFirst();
        return url;
    }

    /**
     * Created by Administrator on 2015/8/17 0017.
     */
    public static class Contact {
        private String name;
        private String email;
        public String description;
        public int id;
        public Contact(){}
        public String getName(){
            return name;
        }

        public void setName(String name) {

            this.name = name;
        }

        public String getEmail() {

            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

    }
}

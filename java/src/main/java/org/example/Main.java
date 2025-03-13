package org.example;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.json.*;
import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Error: No input provided.");
            return;
        }

        String strPublicKey = args[0]; // JSON input as argument
        // System.out.println(strPublicKey); 

        String jsonString = args[1]; // JSON input as argument
        // System.out.println(jsonString); 

        JSONObject json = new JSONObject(jsonString);

        // System.out.println("json: " + json.toString(4)); // Print request with indentation
        
        BAYSignV2 baySign = new BAYSignV2();
        String signature = baySign.createSignature(strPublicKey.trim(), json);

        System.out.println(signature); // Print result so Node.js can read it
    }
}
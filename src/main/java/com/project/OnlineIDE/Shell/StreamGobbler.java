package com.project.OnlineIDE.Shell;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

class StreamGobbler implements Runnable {
	InputStream is;
	String type;
	StringBuffer output = new StringBuffer("");

	StreamGobbler(InputStream is, String type) {
		this.is = is;
		this.type = type;
	}

	public void run() {
		try {
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
			String line = null;
			while ((line = br.readLine()) != null) {
				output.append(line + "\n");
			}

		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}

	public String getOutput() {
		// TODO Auto-generated method stub
		return output.toString();
	}

}
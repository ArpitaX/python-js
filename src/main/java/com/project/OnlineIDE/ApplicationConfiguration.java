package com.project.OnlineIDE;

import java.io.File;

public final class ApplicationConfiguration {
	private static final String LOCATION = "SourceCodeFiles";
	private static final String FILENAME = "Solution";
	
	public static String getFilename() {
		
		return FILENAME;
	}
	public static String getLocation() {
		File directory = new File(LOCATION);
		if (!directory.exists()) {
			directory.mkdir();
			// If you require it to make the entire directory path including parents,
			// use directory.mkdirs(); here instead.
		}
		return directory.getAbsolutePath();
	}
	
	
}

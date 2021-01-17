package com.project.OnlineIDE.RCE;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.project.OnlineIDE.ApplicationConfiguration;

public class FileHandlerService {

	static String filename = ApplicationConfiguration.getFilename();
	static String location = ApplicationConfiguration.getLocation();

	public static boolean makeFile(String extension, String code) {
		FileWriter writer;
		BufferedWriter buffer;

		File directory = new File(location);
		if (!directory.exists()) {
			directory.mkdir();
			// If you require it to make the entire directory path including parents,
			// use directory.mkdirs(); here instead.
		}
		File file = new File(location + File.separator + filename + "." + extension);
		try {
			writer = new FileWriter(file.getAbsoluteFile());
			buffer = new BufferedWriter(writer);
			buffer.write(code);
			buffer.close();
			return true;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	public static boolean deleteFile(String extension) {
		boolean status = false;
		try {
			status = Files.deleteIfExists(Paths.get(location + File.separator + filename + "." + extension));
		} catch (Exception e) {
			System.out.println("No such file/directory exists");
			return status;
		}
		return status;
	}
}

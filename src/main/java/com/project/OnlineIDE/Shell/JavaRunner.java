package com.project.OnlineIDE.Shell;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import com.project.OnlineIDE.RCE.OutputContainer;

public class JavaRunner implements CommandInterpreterUtil {

	/*
	 * public OutputContainer run(String location, String filename, OutputContainer
	 * output) {
	 * 
	 * String change_dir = "cd " + location; String compile_file = "javac " +
	 * filename + ".java"; String run_file = "java " + filename;
	 * 
	 * String command = change_dir + " && " + compile_file + " && " + run_file;
	 * 
	 * ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", command);
	 * builder.directory(new File(System.getProperty("user.home")));
	 * builder.redirectErrorStream(true);
	 * 
	 * // String output = null; try { Process process = builder.start();
	 * 
	 * StreamGobbler out = new StreamGobbler(process.getInputStream(), "OUT");
	 * out.run(); StreamGobbler err = new StreamGobbler(process.getErrorStream(),
	 * "ERR"); err.run();
	 * 
	 * System.out.println(out.getOutput()); output.setResult(out.getOutput());
	 * output.setError(err.getOutput());
	 * 
	 * } catch (Exception e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); } return output; }
	 */

	public OutputContainer run(String args, String location, String filename, OutputContainer output) {

		String change_dir = "cd " + location;
		String compile_file = "javac " + filename + ".java";
		String run_file = "java " + filename;

		String command = change_dir + " && " + compile_file + " && " + run_file;

		ProcessBuilder builder = new ProcessBuilder("bash", "-c", command);
		builder.directory(new File(System.getProperty("user.home")));
		builder.redirectErrorStream(true);

		// String output = null;
		try {
			Process process = builder.start();

			StreamGobbler out = new StreamGobbler(process.getInputStream(), "OUT");
			StreamGobbler err = new StreamGobbler(process.getErrorStream(), "ERR");

			PrintWriter userInput = new PrintWriter(process.getOutputStream());
			userInput.print(args);
			userInput.close();

			out.run();
			err.run();
			System.out.println(out.getOutput());
			output.setResult(out.getOutput());
			output.setError(err.getOutput());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return output;
	}

}

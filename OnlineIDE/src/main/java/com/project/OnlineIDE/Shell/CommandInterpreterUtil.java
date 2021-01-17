package com.project.OnlineIDE.Shell;

import org.springframework.stereotype.Service;

import com.project.OnlineIDE.RCE.OutputContainer;

public interface CommandInterpreterUtil {
	// public OutputContainer run(String location, String filename, OutputContainer output);

	public OutputContainer run(String args, String location, String filename, OutputContainer output);
}

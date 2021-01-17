package com.project.OnlineIDE.RCE;

import org.springframework.stereotype.Service;

import com.project.OnlineIDE.ApplicationConfiguration;
import com.project.OnlineIDE.Shell.CommandInterpreterUtil;
import com.project.OnlineIDE.Shell.JavaRunner;
import com.project.OnlineIDE.Shell.PythonRunner;

@Service
public class CodeRunnerService {

	static String filename = ApplicationConfiguration.getFilename();
	static String location = ApplicationConfiguration.getLocation();

	OutputContainer runCode(String language, String inputs, String hasUserInput, OutputContainer output) {

		System.out.println("language: " + language);
		System.out.println("inputs: " + inputs);
		System.out.println("hasUserInput: " + hasUserInput);

		if (hasUserInput.equals("true") && (inputs == null || inputs.equals("")))
			return null;

		CommandInterpreterUtil c;

		switch (language) {
		case "java":
			c = new JavaRunner();
			if (inputs == null || inputs.equals(""))
				inputs = null;
			return c.run(inputs, location, filename, output);
		case "py":
			c = new PythonRunner();
			if (inputs == null || inputs.equals(""))
				inputs = null;
			return c.run(inputs, location, filename, output);
		}
		return null;

	}

}

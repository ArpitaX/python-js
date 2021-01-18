package com.project.OnlineIDE.RCE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class RCEController {

	@Autowired
	CodeRunnerService runner;

	@Autowired
	OutputContainer output;

	@RequestMapping(method = RequestMethod.POST, value = "/run")
	public ResponseEntity<OutputContainer> runCode(InputContainer input) {
		
		if(input.getCode() == null || input.getCode().equals("")) {
			output = new OutputContainer("", "");
			return new ResponseEntity<OutputContainer>(output, HttpStatus.OK);
		}

		boolean success = FileHandlerService.makeFile(input.getLanguage(), input.getCode());
		System.out.println("File Created: " + success);
		if (success) {
			output = runner.runCode(input.getLanguage(), input.getInputs(), input.getHasuserinput(), output);
			FileHandlerService.deleteFile(input.getLanguage());

			if (output == null) {
				output = new OutputContainer("", "Bad or Illegal Inputs");
				return new ResponseEntity<OutputContainer>(output, HttpStatus.OK);
			}

			return new ResponseEntity<OutputContainer>(output, HttpStatus.OK);
		}
		output = new OutputContainer("", "Error occured while creating Executable Entity");
		return new ResponseEntity<OutputContainer>(output, HttpStatus.OK);

	}
}

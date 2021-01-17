package com.project.OnlineIDE.RCE;

import org.springframework.stereotype.Component;

@Component
public class OutputContainer {
	private String result;
	private String error;

	public OutputContainer(String result, String error) {
		super();
		this.result = result;
		this.error = error;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public OutputContainer() {
		super();
		// TODO Auto-generated constructor stub
	}
}

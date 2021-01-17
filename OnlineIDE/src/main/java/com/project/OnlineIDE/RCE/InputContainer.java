package com.project.OnlineIDE.RCE;

public class InputContainer {
	private String language;
	private String code;
	private String hasuserinput;
	private String inputs;

	public InputContainer(String language, String code, String hasuserinput, String inputs) {
		super();
		this.language = language;
		this.code = code;
		this.hasuserinput = hasuserinput;
		this.inputs = inputs;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getHasuserinput() {
		return hasuserinput;
	}

	public void setHasuserinput(String hasuserinput) {
		this.hasuserinput = hasuserinput;
	}

	public String getInputs() {
		return inputs;
	}

	public void setInputs(String inputs) {
		this.inputs = inputs;
	}

}

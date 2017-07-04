<?php
/**
 * Created by PhpStorm.
 * User: felix
 * Date: 2016/10/11
 * Time: 10:14
 */
require "vendor/autoload.php";

class HeyShow{

	const BASE_URL      = "http://www.bozhushou.com/";
	const NOTIFY_URL    = "http://www.heyad.tv/api/statistics/download";
	const JSON_PATH     = "version";
	const FILE_PATH     = "BoZhuShouInstall_0.1.2.exe";

	private $_version   = null;
	private $_downloadUrl   = null;
	private $_name      = null;
	private $_data      = [];
	private $_json      = null;

	public function __construct()
	{
		$this->_data = $this->getJson()->toArray();
	}

	private function getJson(){
		$this->_json = file_get_contents(self::JSON_PATH);
		return $this;
	}

	private function toArray (){
		return json_decode($this->_json,true);
	}

	function download(){
		header("Location:{$this->_downloadUrl}");
	}

	public function notify(){
		$data   = [
			'file'      => $this->getName(),
			'ver'   => $this->getVersion(),
			'ip'        => $_SERVER['REMOTE_ADDR'],
			'agent'        => $_SERVER['HTTP_USER_AGENT'],
		];
		$header  = "User-Agent:{$_SERVER['HTTP_USER_AGENT']}\r\n";
		$curlService = new \Ixudra\Curl\CurlService();
		$curlService->to(self::NOTIFY_URL)
			->withHeader($header)
			->withTimeout(5)
			->withData($data)
			->get();
		return $this;
	}

	public function getName()
	{
		$this->_name = isset($this->_data['windows']['name']) ? $this->_data['windows']['name'] : basename($this->getDownloadUrl());
		return $this->_name;
	}
	public function getVersion(){
		if($this->_name)
		{
			$name=$this->_name;
		}else{
			$name=$this->getName();
		}
		preg_match_all('/_(\d+)\.(\d+)\.(\d+)\./', $name, $matches);
		if(!$matches)
		{
			die("version error");
		}
		$major = $matches[1][0]??0;
		$minor = $matches[2][0]??0;
		$patch = $matches[3][0]??0;
		$this->_version     = "{$major}.{$minor}.{$patch}";
		return $this->_version;
	}
	public function getDownloadUrl(){
		$versionInfo=$this->getVersionInfo();
		// $this->_downloadUrl =  self::FILE_PATH . '?_='.microtime(true);
		$pathInfo=pathinfo($_SERVER['PHP_SELF']);
		$this->_downloadUrl =  'http://'.$_SERVER['HTTP_HOST'].$pathInfo['dirname'].'/'.$versionInfo['windows']['download'];
		return $this->_downloadUrl;
	}

	public function getVersionInfo()
	{
		$json=json_decode(file_get_contents(static::JSON_PATH),true);
		if(!$json)die("version file error");
		return $json;
	}

}

$heyShow = new HeyShow();
$heyShow->notify()->download();




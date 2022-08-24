<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class CharactersController extends BaseController
{

    private $marvel_characters_uri = 'https://gateway.marvel.com:443/v1/public/characters';

    public function AllCharacters(){
        $ts = time();
        $hash = md5($ts.$_ENV['MARVEL_PRIVATE_KEY'].$_ENV['MARVEL_PUBLIC_KEY']);
        $query = array(
            "limit"  => 20,
            "apikey" => $_ENV['MARVEL_PUBLIC_KEY'],
            "ts"     => $ts,
            "hash"   => $hash
        );
        if(isset($_GET['offset'])){
            $query['offset'] = \htmlentities(\strtolower($_GET['offset']));
        }
        $url = $this->marvel_characters_uri.'?'.http_build_query($query);
        $curl_result = $this->ApiRequest($url, $query);
        
        $character_ids = array_column($curl_result["data"]["results"],'id'); 
        $character_names = array_column($curl_result["data"]["results"],'name');
        $character_uris = array_column($curl_result["data"]["results"],'resourceURI');  
        $character_thumbnails = array_map(function($i){
            return $i['thumbnail']['path'].'.'.$i['thumbnail']['extension'];
        }, $curl_result["data"]["results"]);

        $result_array =  array_map(function ($id, $name, $thumbnail,$uri) {
            return array(
                'id'       => $id,
                'name'     => $name,
                'thumbnail'=> $thumbnail,
                'uri'      => $uri
            );
        }, $character_ids,$character_names,$character_thumbnails, $character_uris);
        
        return json_encode($result_array, JSON_UNESCAPED_SLASHES);
    }
    
    public function Character($characterId){
        $ts = time();
        $hash = md5($ts.$_ENV['MARVEL_PRIVATE_KEY'].$_ENV['MARVEL_PUBLIC_KEY']);
        $query = array(
            "apikey" => $_ENV['MARVEL_PUBLIC_KEY'],
            "ts"     => $ts,
            "hash"   => $hash
        );
        $url = $this->marvel_characters_uri.'/'.$characterId.'?'.http_build_query($query);
        $curl_result = $this->ApiRequest($url, $query);
        
        return $curl_result;
    }

    private function ApiRequest($url, $query){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_URL, $url);
        $curl_result = json_decode(curl_exec($curl),true);
        curl_close($curl);
        return $curl_result;
    }
}

<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class CharactersController extends BaseController
{

    private $marvel_characters_uri = 'https://gateway.marvel.com:443/v1/public/characters';

    public function __construct(){
        //$debug = env('APP_DEBUG', true);
    }

    public function AllCharacters(){
        $ts = time();
        $hash = md5($ts.env('MARVEL_PRIVATE_KEY').env('MARVEL_PUBLIC_KEY'));
        $query = array(
            "limit"  => \htmlentities(\strtolower($_GET['perPage'])),
            "apikey" => env('MARVEL_PUBLIC_KEY'),
            "ts"     => $ts,
            "hash"   => $hash
        );
        $query['offset'] = \htmlentities(\strtolower($_GET['offset']));
        
        $url = $this->marvel_characters_uri.'?'.http_build_query($query);
        $curl_result = $this->ApiRequest($url, $query);
        
        $character_ids = array_column($curl_result["data"]["results"],'id'); 
        $character_names = array_column($curl_result["data"]["results"],'name');
        $character_uris = array_column($curl_result["data"]["results"],'resourceURI');  
        $character_thumbnails = array_map(function($i){
            return $i['thumbnail']['path'].'.'.$i['thumbnail']['extension'];
        }, $curl_result["data"]["results"]);

        $data_array =  array_map(function ($id, $name, $thumbnail,$uri) {
            return array(
                'id'       => $id,
                'name'     => $name,
                'thumbnail'=> $thumbnail,
                'uri'      => $uri
            );
        }, $character_ids,$character_names,$character_thumbnails, $character_uris);
        $result_array['data'] = $data_array;
        $result_array['total'] = $curl_result["data"]["total"];
        return json_encode($result_array, JSON_UNESCAPED_SLASHES);
    }
    
    public function Character($characterId){
        $ts = time();
        $hash = md5($ts.env('MARVEL_PRIVATE_KEY').env('MARVEL_PUBLIC_KEY'));
        $query = array(
            "apikey" => env('MARVEL_PUBLIC_KEY'),
            "ts"     => $ts,
            "hash"   => $hash
        );
        $url = $this->marvel_characters_uri.'/'.$characterId.'?'.http_build_query($query);
        $curl_result = $this->ApiRequest($url, $query)["data"]["results"][0];
        $result = array(
            "data" => array(
                "id" => $curl_result["id"],
                "name" => $curl_result["name"],
                "description" => $curl_result["description"],
                "thumbnail" => $curl_result["thumbnail"]["path"].".".$curl_result["thumbnail"]["extension"],
                "available_comics" => $curl_result["comics"]["available"],
                "available_series" => $curl_result["series"]["available"],
                "available_stories" => $curl_result["stories"]["available"],
                "available_events" => $curl_result["events"]["available"],
                "marvel_url" => $curl_result["urls"][array_search("detail", array_column($curl_result["urls"], 'type'))]["url"]
            )
        );
        return json_encode($result, JSON_UNESCAPED_SLASHES);
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

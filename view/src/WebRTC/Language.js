import React, { Component } from 'react';
export default class Language extends Component {
var langs =
    [['Afrikaans',       ['af-ZA']],
     ['Bahasa Indonesia',['id-ID']],
     ['Bahasa Melayu',   ['ms-MY']],
     ['Català',          ['ca-ES']],
     ['Čeština',         ['cs-CZ']],
     ['Deutsch',         ['de-DE']],
     ['English',         ['en-AU', 'Australia'],
                         ['en-CA', 'Canada'],
                         ['en-IN', 'India'],
                         ['en-NZ', 'New Zealand'],
                         ['en-ZA', 'South Africa'],
                         ['en-GB', 'United Kingdom'],
                         ['en-US', 'United States']],
     ['Español',         ['es-AR', 'Argentina'],
                         ['es-BO', 'Bolivia'],
                         ['es-CL', 'Chile'],
                         ['es-CO', 'Colombia'],
                         ['es-CR', 'Costa Rica'],
                         ['es-EC', 'Ecuador'],
                         ['es-SV', 'El Salvador'],
                         ['es-ES', 'España'],
                         ['es-US', 'Estados Unidos'],
                         ['es-GT', 'Guatemala'],
                         ['es-HN', 'Honduras'],
                         ['es-MX', 'México'],
                         ['es-NI', 'Nicaragua'],
                         ['es-PA', 'Panamá'],
                         ['es-PY', 'Paraguay'],
                         ['es-PE', 'Perú'],
                         ['es-PR', 'Puerto Rico'],
                         ['es-DO', 'República Dominicana'],
                         ['es-UY', 'Uruguay'],
                         ['es-VE', 'Venezuela']],
     ['Euskara',         ['eu-ES']],
     ['Français',        ['fr-FR']],
     ['Galego',          ['gl-ES']],
     ['Hrvatski',        ['hr_HR']],
     ['IsiZulu',         ['zu-ZA']],
     ['Íslenska',        ['is-IS']],
     ['Italiano',        ['it-IT', 'Italia'],
                         ['it-CH', 'Svizzera']],
     ['Magyar',          ['hu-HU']],
     ['Nederlands',      ['nl-NL']],
     ['Norsk bokmål',    ['nb-NO']],
     ['Polski',          ['pl-PL']],
     ['Português',       ['pt-BR', 'Brasil'],
                         ['pt-PT', 'Portugal']],
     ['Română',          ['ro-RO']],
     ['Slovenčina',      ['sk-SK']],
     ['Suomi',           ['fi-FI']],
     ['Svenska',         ['sv-SE']],
     ['Türkçe',          ['tr-TR']],
     ['български',       ['bg-BG']],
     ['Pусский',         ['ru-RU']],
     ['Српски',          ['sr-RS']],
     ['한국어',            ['ko-KR']],
     ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                         ['cmn-Hans-HK', '普通话 (香港)'],
                         ['cmn-Hant-TW', '中文 (台灣)'],
                         ['yue-Hant-HK', '粵語 (香港)']],
     ['日本語',           ['ja-JP']],
     ['Lingua latīna',   ['la']]];

  componentDidMount() {

    if (!('webkitSpeechRecognition' in window)) {
          $("#start_transcription").hide();
    } else {
          $("#start_transcription").show();
          var recognition = new webkitSpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onstart = function() {
            recognizing = true;
          }

          recognition.onerror = function(event) {
            if (event.error == 'no-speech') {
                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
              ignore_onend = true;
            }
          }

          recognition.onend = function() {
              recognition.start();
          }

          recognition.onresult = function(event) {
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                window.final_transcript = event.results[i][0].transcript;
                TeddyRTC.conn.send(window.final_transcript);
                window.message_count++;
                $(".messages").append('<li className="notranslate" id="original_' + window.message_count + '">' + window.final_transcript + '</li>');
                $(".translated_messages").append("<li id='translated_" + window.message_count+ "'>" + window.final_transcript + "</li>");
                $(".messages").animate({ scrollTop: $('.messages')[0].scrollHeight }, 1000);
                $(".translated_messages").animate({ scrollTop: $('.messages')[0].scrollHeight }, 1000);
                waitForTranslate();
              }
              else
                interim_transcript += event.results[i][0].transcript;
            }
          }
    }

    window.final_transcript = '';
    var recognizing = false;
    var ignore_onend;
    var start_timestamp;

    if (recognizing) {
      recognition.stop();
      return;
    }
    recognition.lang = 6;
    recognition.start();
    ignore_onend = false;
    $("#final_span").html('');
    $("#interim_span").html('');
    $("#start_img").html("span className='fui-mic'></span>");
    start_timestamp = event.timeStamp;
    Synthesis = function(text) {
        var utterance = new SpeechSynthesisUtterance(text);
        var voices = window.speechSynthesis.getVoices();

        utterance.voice = voices.filter(function(voice){
            var translated_language = readCookie('googtrans');
            setTimeout(1000,function() { });
            if ( translated_language == "/en/es")
              return voice.name == 'Google Español';
            else if (translated_language == "/en/fr")
              return voice.name == 'Google Français';
            else if (translated_language == "/en/it")
              return voice.name == 'Google Italiano';
            else if (translated_language == "/en/de")
              return voice.name == 'Google Deutsch';
            else if (translated_language == "/en/ja")
              return voice.name == 'Google 日本人';
            else if (translated_language == "/en/ko")
              return voice.name == 'Google 한국의';
            else if (translated_language == "/en/zh-CN")
              return voice.name == 'Google 中国的';
            else
              return voice.name == 'native';

        })[0];

        window.speechSynthesis.speak(utterance);
      }
      
  }
  render() {
    return (
      <div>
       </div>
      );
  }
}
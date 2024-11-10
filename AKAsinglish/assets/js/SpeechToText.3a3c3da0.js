import{l as p,_ as u,A as h,b9 as d,E as t,d as s,Q as r,bq as g,D as o,bg as c,br as T,bs as v}from"./index.62b89749.js";
import{Q as b}from"./QSelect.fddf1561.js";
import{L as m}from"./localbase.56895cae.js";
let n=new m("KDJApps");
const f=p({data(){return{recognizing:!1,
    recognition:null,
    transcriptionCount:0,
    finalTranscription:"මෙතන සිංග්ලිශ් වලින් ටයිප් කරන්න",
    interimTranscription:"",
    selectedLanguage:"si-LK",transcriptTitle:"",
    selectedTranscript:null,previousTranscripts:[],
    supportedLanguages:[{label:"Sinhala (\u0DC3\u0DD2\u0D82\u0DC4\u0DBD)",
        value:"si-LK"},
        {label:"Afrikaans",
            value:"af-ZA"},
            {label:"Albanian",value:"sq-AL"},
            {label:"Arabic",value:"ar-SA"},
            {label:"Armenian",value:"hy-AM"},
            {label:"Bengali",value:"bn-BD"},
            {label:"Bulgarian",value:"bg-BG"},
            {label:"Catalan",value:"ca-ES"},
            {label:"Chinese (Mandarin)",value:"zh-CN"},
            {label:"Croatian",value:"hr-HR"},
            {label:"Czech",value:"cs-CZ"},
            {label:"Danish",value:"da-DK"},
            {label:"Dutch",value:"nl-NL"},
            {label:"English (US)",value:"en-US"},
            {label:"English (UK)",value:"en-GB"},
            {label:"Estonian",value:"et-EE"},
            {label:"Finnish",value:"fi-FI"},
            {label:"French",value:"fr-FR"},
            {label:"German",value:"de-DE"},
            {label:"Greek",value:"el-GR"},
            {label:"Hindi",value:"hi-IN"},
            {label:"Hungarian",value:"hu-HU"},
            {label:"Icelandic",value:"is-IS"},
            {label:"Indonesian",value:"id-ID"},
            {label:"Italian",value:"it-IT"},
            {label:"Japanese",value:"ja-JP"},
            {label:"Korean",value:"ko-KR"},
            {label:"Latvian",value:"lv-LV"},
            {label:"Lithuanian",value:"lt-LT"},
            {label:"Malay",value:"ms-MY"},
            {label:"Norwegian",value:"nb-NO"},
            {label:"Polish",value:"pl-PL"},
            {label:"Portuguese",value:"pt-PT"},
            {label:"Romanian",value:"ro-RO"},
            {label:"Russian",value:"ru-RU"},
            {label:"Slovak",value:"sk-SK"},
            {label:"Slovenian",value:"sl-SI"},
            {label:"Spanish",value:"es-ES"},
            {label:"Swedish",value:"sv-SE"},
            {label:"Tamil",value:"ta-IN"},
            {label:"Telugu",value:"te-IN"},
            {label:"Thai",value:"th-TH"},
            {label:"Turkish",value:"tr-TR"},
            {label:"Ukrainian",value:"uk-UA"},
            {label:"Urdu",value:"ur-PK"},
            {label:"Vietnamese",value:"vi-VN"},
            {label:"Welsh",value:"cy-GB"}]}},
            methods:{async getTranscriptionCount(){try{const e=await n.collection("SinglishTranscripts").get();
            this.transcriptionCount=e.length}catch(e){console.error("Error fetching transcription count:",e)}},
            async loadTranscripts(){try{this.previousTranscripts=await n.collection("SinglishTranscripts").orderBy("timestamp","desc").get(),
            console.log("Loaded transcripts:",
                this.previousTranscripts),await this.getTranscriptionCount()}catch(e){console.error("Error loading transcripts:",e)}},
            toggleRecording(){this.recognizing?(this.recognition.stop(),
            this.recognizing=!1)
            :(this.startRecognition(),
            this.recognizing=!0)},
            startRecognition(){this.finalTranscription==="මෙතන සිංග්ලිශ් වලින් ටයිප් කරන්න"&&(this.finalTranscription=""),
            this.recognition=new webkitSpeechRecognition||new SpeechRecognition,
            this.recognition.lang=this.selectedLanguage,
            this.recognition.interimResults=!0,
            this.recognition.continuous=!0,
            this.recognition.onresult=e=>{this.interimTranscription="";let i="";
                for(let a=e.resultIndex;
                    a<e.results.length;++a)e.results[a].isFinal?i+=e.results[a][0].transcript+" ":this.interimTranscription+=e.results[a][0].transcript+" ";
                i&&(this.finalTranscription+=i)},
                this.recognition.onerror=e=>{console.error("Speech recognition error:",e.error)},
                this.recognition.onend=()=>{this.recognizing=!1,
                    this.interimTranscription&&(this.finalTranscription+=this.interimTranscription,
                    this.interimTranscription="")},
                    this.recognition.start()},
                    handleKeyPress(e){e.key.toLowerCase()==="r"&&this.toggleRecording()},
                    changeLanguage(){this.recognizing&&(this.recognition.stop(),
                    this.startRecognition())},
                    copyTranscription(){const e=(this.finalTranscription+this.interimTranscription).trim();
                    navigator.clipboard.writeText(e).then(()=>{console.log("Transcription copied to clipboard")})
                    .catch(i=>{console.error("Failed to copy: ",i)})},
                    async saveTranscript(){const e=(this.finalTranscription+this.interimTranscription).trim();
                        if(e&&e!=="මෙතන සිංග්ලිශ් වලින් ටයිප් කරන්න")try{let i=this.transcriptTitle.trim();
                        i||(i=`Untitled(${await n.collection("SinglishTranscripts").count()+1})`),
                        await n.collection("SinglishTranscripts").add({title:i,text:e,
                        timestamp:new Date().getTime()}),
                        this.$q.notify({type:"positive",
                            message:"Transcript saved successfully",
                            position:"top",timeout:2e3}),
                            this.finalTranscription="",
                            console.log("Transcript saved successfully"),
                            this.transcriptTitle="",
                            await this.getTranscriptionCount()}catch(i){console.error("Error saving transcript:",i),
                                this.$q.notify({type:"negative",
                                    message:"Error saving transcript. Please try again.",
                                    position:"top",timeout:2e3})}else this.$q.notify({type:"warning",
                                    message:"No content to save. Please record or type something first.",
                                    position:"top",timeout:2e3})},
                                    async loadTranscripts(){try{this.previousTranscripts=await n.collection("SinglishTranscripts").orderBy("timestamp","desc").get(),
                                    console.log("Loaded transcripts:",
                                        this.previousTranscripts)}catch(e){console.error("Error loading transcripts:",e)}},
                                        async loadSelectedTranscript(){if(this.selectedTranscript)try{const e=await n.collection("SinglishTranscripts").doc({id:this.selectedTranscript}).get();
                                        this.finalTranscription=e.text,
                                        this.transcriptTitle=e.title}catch(e){console.error("Error loading selected transcript:",e)}}},
                                        mounted(){window.addEventListener("keypress",this.handleKeyPress),this.loadTranscripts(),
                                            this.getTranscriptionCount()},beforeUnmount(){window.removeEventListener("keypress",this.handleKeyPress)}}),
                                            y=e=>(T("data-v-a96eefec"),
                                            e=e(),v(),e),S={class:"container-fluid"},
                                            k={class:"controls"},
                                            w={class:"title-input"},
                                            L={class:"output-section"},
                                            R={id:"output",class:"outputText"},
                                            C={class:"interim"},
                                            E={style:{"font-size":"12px"}},
                                            _=y(()=>t("a",{style:{color:"red"},
                                                href:"https://kdj.lk/singlish"},
                                                "kdj.lk/singlish",-1)),
                                                I={class:"action-section"};
                                                function D(e,i,a,N,A,B){return h(),
                                                    d("div",S,[t("div",k,[s(r,{id:"recordButton",
                                                    class:"bg-dark text-white",
                                                    onClick:e.toggleRecording,
                                                    label:e.recognizing?"STOP RECORDING (R)":"START RECORDING (R)"},
                                                    null,8,["onClick","label"]),s(b,{modelValue:e.selectedLanguage,"onUpdate:modelValue":i[0]||(i[0]=l=>e.selectedLanguage=l),
                                                        options:e.supportedLanguages,label:"Select Language","emit-value":"","map-options":"",onInput:e.changeLanguage},null,8,["modelValue","options","onInput"])]),
                                                        t("div",w,[s(g,{modelValue:e.transcriptTitle,"onUpdate:modelValue":i[1]||(i[1]=l=>e.transcriptTitle=l),label:"Transcript Title"},null,8,["modelValue"])]),
                                                        t("div",L,[t("div",R,[o(c(e.finalTranscription)+" ",1),
                                                            t("span",C,c(e.interimTranscription),1)])]),t("p",E,[o("You've got "+c(e.transcriptionCount)+" Transcriptions. You can load all the saved transcripts from ",1),_,o(" and edit Sinhala Transcripts easily as needed.")]),
                                                            t("div",I,[s(r,{class:"bg-primary text-white",
                                                                onClick:e.copyTranscription,label:"COPY"},
                                                                null,8,["onClick"]),
                                                                s(r,{class:"bg-secondary text-white q-ml-md",
                                                                    onClick:e.saveTranscript,label:"SAVE"},
                                                                    null,8,["onClick"])])])}var U=u(f,
                                                                        [["render",D],["__scopeId","data-v-a96eefec"]]);export{U as S};
(this.webpackJsonpahtok=this.webpackJsonpahtok||[]).push([[0],{103:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(9),o=t.n(c),i=(t(90),t(91),t(58)),u=t(10),l=t(20);function s(e,n){return n?e+1:Math.max(0,e-1)}var f=t(147);function m(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3?arguments[3]:void 0,r=null!==a&&void 0!==a?a:"Token"+e;return{value:e,count:n,chaos:t,name:r,id:r+"_"+f.a()}}function d(e){return Object(u.a)({},e)}function p(e,n){return e.tokens.find((function(e){return e.name===n}))}function g(e,n){var t={tokens:e.tokens.map((function(e){return d(e)}))},a=p(t,n);return a&&(a.count-=1),t.tokens=t.tokens.filter((function(e){return e.count>0})),t}function h(e){for(var n={tokens:e.tokens.map((function(e){return d(e)}))},t=arguments.length,a=new Array(t>1?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];return a.forEach((function(e){var t=p(n,e.name);t?t.count+=e.count:n.tokens.push(e)})),n}function v(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return{tokens:n}}function S(e,n,t){return s(e[n],t)}function E(){for(var e=new Map,n=arguments.length,t=new Array(n),a=0;a<n;a++)t[a]=arguments[a];return t.forEach((function(n){return e.set(n.name,n.effect)})),e}function k(e,n,t,a){return{character:t,context:a,tokens:e.tokens.map((function(e){return function(e,n){return Object(u.a)(Object(u.a)({},e),{},{effect:null!==n&&void 0!==n?n:function(){return e.value}})}(e,n.get(e.name))}))}}var b=m(-99,1,!0,"Fallo");function C(e){return e.tokens.sort((function(n,t){return t.effect(e)-n.effect(e)}))}function y(e){var n=e.tokens,t=0;return n.reduce((function(n,a){return-99!==a.value?(t+=a.count,n+a.effect(e)*a.count):n}),0)/t}function O(e){var n=y(e);return Math.floor(n)}function x(e){return function(e){return C(e).reduce((function(n,t){var a=n.length>=1?n[n.length-1]:void 0;return a&&a.value===t.effect(e)?a.count=a.count+t.count:n.push({value:t.effect(e),count:t.count}),n}),[])}(e).reduce((function(e,n){var t=e.length>0?e[e.length-1].count:0;return e.concat({value:n.value,count:n.count+t})}),[])}function A(e,n){var t=e.tokens.map((function(e){return e.name!==n?e:function(e){return Object(u.a)(Object(u.a)({},e),{},{count:e.count-1})}(e)})).filter((function(e){return e.count>0}));return Object(u.a)(Object(u.a)({},e),{},{tokens:t})}function j(e){var n=x(e),t=new Map;t.tokenBag=e;var a=n[n.length-1].count;return n.forEach((function(n){if(-99!==n.value){var r=100*n.count/a,c=function(e,n){for(var t=[],a=C(e),r=0;r<a.length&&a[r].effect(e)>=n;){if(a[r].effect(e)===n)for(var c=0;c<a[r].count;c++)t.push(a[r]);r++}return t}(e,n.value);t.set(n.value,{tokens:c,prob:r})}})),t}function T(e,n,t){var a=[],r=!0;return e.forEach((function(e,c){var o=Math.max(n+c,0),i=o>=t,u=Math.max(o-1,0)>=t,l=i&&!u,s=!i&&r;r=i,a.push({key:c,tokens:e.tokens,prob:e.prob,pass:i,firstFail:s,currentProb:l})})),a}t(92);var N=t(132);function V(e){var n=Object(a.useState)(!0),t=Object(i.a)(n,2),c=t[0],o=t[1];return r.a.createElement(N.a,{in:c,onExited:function(){e.onClick&&e.onClick(e.token),o(!0)}},r.a.createElement("span",{style:{cursor:"pointer"},className:"Token "+e.token.name,onClick:function(){e.onClick&&(e.fadeOut||e.fadeOutFadeIn?o(!1):e.onClick(e.token))}},"T"))}var D=t(137),w=t(136),B=t(151),_=t(135),I=t(148),L=t(153);function F(e){var n=e.valueSpec,t=Object(L.a)().t;return"number"===n.type?r.a.createElement(H,{inline:!1,name:t(n.name),currentValue:e.currentValue,incValue:function(){return e.incDecContextValue(!0)},decValue:function(){return e.incDecContextValue(!1)}}):r.a.createElement(M,{name:t(n.name),currentValue:e.currentValue,toggle:function(){return e.toggleContextValue()}})}function H(e){var n=e.inline,t=e.name,a=e.currentValue,c=e.incValue,o=e.decValue,i={verticalAlign:"middle"};return r.a.createElement("div",{className:"ParamChanger"},n?r.a.createElement("span",null,t):r.a.createElement(B.a,null,t),r.a.createElement(_.a,{className:"IconAction material-icons",style:i,onClick:function(e){return c()}},"arrow_circle_up"),a,r.a.createElement(_.a,{className:"IconAction material-icons",style:i,onClick:function(e){return o()}},"arrow_circle_down"))}function M(e){var n=e.name,t=e.currentValue,a=e.toggle;return r.a.createElement("div",{className:"ParamChanger"},r.a.createElement(B.a,null,n,":"),r.a.createElement(I.a,{checked:t,onChange:function(e){return a()},color:"primary",name:"name",inputProps:{"aria-label":"primary checkbox"}}))}var G=t(13);function U(e){return{type:"CHANGE_SKILL",incDec:e}}function P(e){return{type:"CHANGE_TEST",incDec:e}}var R=Object(G.b)((function(e){return{skill:e.skillTest.skill,test:e.skillTest.test}}),(function(e){return{incSkill:function(){return e(U(!0))},decSkill:function(){return e(U(!1))},incTest:function(){return e(P(!0))},decTest:function(){return e(P(!1))}}}))((function(e){var n=e.skill,t=e.test,a=e.incSkill,c=e.decSkill,o=e.incTest,i=e.decTest,u=Object(L.a)().t;return r.a.createElement(w.a,{variant:"h5"},r.a.createElement(H,{inline:!0,name:u("Skill"),currentValue:n,incValue:a,decValue:c}),r.a.createElement(H,{inline:!0,name:u("Test"),currentValue:t,incValue:o,decValue:i}))}));var J=Object(G.b)((function(e,n){return{passZone:j(n.tokenBag),skillTest:e.skillTest}}))((function(e){var n=e.passZone,t=e.skillTest,a=Object(L.a)().t,c=T(n,t.skill,t.test);return r.a.createElement(D.a,{container:!0,className:"PassZone",alignItems:"center"},r.a.createElement(D.a,{item:!0,xs:12,sm:7,md:6},r.a.createElement(w.a,{variant:"h4"},a("Pass zone")),r.a.createElement("hr",null),r.a.createElement(D.a,{container:!0,direction:"column"},c.map((function(e){return r.a.createElement(D.a,{key:e.key,item:!0},r.a.createElement(z,{line:e}))}))),r.a.createElement("hr",null)),r.a.createElement(D.a,{item:!0,xs:12,sm:5,md:6,style:{textAlign:"center"}},r.a.createElement(R,null)))}));function z(e){var n,t=e.line,a={color:t.pass?"green":"red"};return n=t.firstFail?r.a.createElement("hr",{className:"PassSeparator Current"}):r.a.createElement("hr",{className:"PassSeparator",style:{borderColor:"transparent"}}),r.a.createElement("div",null,n,r.a.createElement(D.a,{container:!0,direction:"row",alignItems:"flex-start",spacing:1},r.a.createElement(D.a,{item:!0,style:Object(u.a)(Object(u.a)({},a),{},{textAlign:"center"}),xs:2,sm:1},r.a.createElement(w.a,{variant:"h5"},t.key)),r.a.createElement(D.a,{item:!0,style:a,className:"LineProb",xs:2,sm:2},r.a.createElement(w.a,{variant:"body1"},t.prob.toFixed(2),"%")),r.a.createElement(D.a,{item:!0,style:{textAlign:"left"},xs:8,sm:9},r.a.createElement(w.a,{variant:"h3",noWrap:!0},t.tokens.map((function(e,n){return r.a.createElement(V,{key:n,token:e})}))))))}var W=t(146),K=t(145),X=t(140),Z=t(138),$=t(150),Q=t(139),q=t(144),Y=t(149),ee=Object(Z.a)((function(e){return Object($.a)({formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}})})),ne=Object(G.b)((function(e){return{character:e.selectedCharacter,characters:e.selectedCampaign.characters}}),(function(e){return{setCharacter:function(n){return e(function(e){return{type:"CHANGE_CHARACTER",character:e}}(n))}}}))((function(e){var n=e.character,t=e.characters,a=e.setCharacter,c=Object(L.a)().t;return r.a.createElement("div",null,r.a.createElement(B.a,null,c("Current character"),":"),r.a.createElement(Q.a,{variant:"standard",className:ee().formControl},r.a.createElement(q.a,{labelId:"character-selector-label",id:"character-selector",value:n.shortName,onChange:function(e){return a((n=e.target.value,t.find((function(e){return e.shortName===n}))));var n}},t.map((function(e){return r.a.createElement(Y.a,{key:e.shortName,value:e.shortName},e.shortName)})))))}));var te=t(76);function ae(e){return k(e.bagSpec,E.apply(void 0,Object(te.a)(e.selectedScenario.scenarioEffectSpec)),e.selectedCharacter,e.gameContext)}function re(e){var n={};return e.valuesSpec.forEach((function(e){return n[e.name]=e.initialValue})),n}var ce=Object(G.b)((function(e){return{spec:e.selectedScenario.contextSpec,context:e.gameContext}}),(function(e){return{incDecContextValue:function(n,t){return e(function(e,n){return{type:"INC_DEC_CONTEXT_VALUE",key:e,incDec:n}}(n,t))},toggleContextValue:function(n){return e(function(e){return{type:"TOGGLE_CONTEXT_VALUE",key:e}}(n))}}}))((function(e){var n=e.spec,t=e.context,a=e.incDecContextValue,c=e.toggleContextValue;return r.a.createElement(w.a,{variant:"h5",style:{paddingTop:"2vmin"}},Object.keys(t).map((function(e){return r.a.createElement(F,{key:e,currentValue:t[e],valueSpec:(o=n,i=e,o.valuesSpec.find((function(e){return e.name===i}))),incDecContextValue:function(n){return a(e,n)},toggleContextValue:function(){return c(e)}});var o,i})))}));function oe(e){var n=e.tokenBag,t=e.showAverage,a=void 0===t||t,c=e.onClick,o=e.fadeOutTokens,i=void 0!==o&&o,l=Object(L.a)().t;return r.a.createElement("div",{className:"BagDisplay"},a?r.a.createElement(w.a,null,l("Bag average"),": ",y(n)):null,r.a.createElement("p",{className:"TokenStrip"},function(e){var n=[];return e.tokens.forEach((function(e){for(var t=0;t<e.count;t++)n.push(Object(u.a)(Object(u.a)({},e),{},{count:1,id:e.id+"_"+t}))})),n}(n).map((function(e,n){return r.a.createElement(V,{key:e.id,token:e,onClick:c,fadeOut:i})}))))}var ie=Object(G.b)((function(e,n){return{tokenBag:n.tokenBag}}),(function(e){return{addToken:function(n){return e({type:"ADD_TOKEN",tokenSpec:n})},removeToken:function(n){return e({type:"REMOVE_TOKEN",tokenSpec:n})}}}))((function(e){var n=e.tokenBag,t=e.addToken,a=e.removeToken,c=le(),o=Object(L.a)().t,i=v(m(2,1,!1,"elderSign"),m(1,1,!1),m(0,1,!1),m(-1,1,!1),m(-2,1,!1),m(-3,1,!1),m(-4,1,!1),m(-5,1,!1),m(-6,1,!1),m(-8,1,!1),m(0,1,!0,"Calavera"),m(0,1,!0,"Sectario"),m(0,1,!0,"L\xe1pida"),m(0,1,!0,"Antiguo"),b);return r.a.createElement(K.a,{textAlign:"center",className:c.paper},r.a.createElement(w.a,{id:"bag-management-title",variant:"h3"},o("Chaos bag")),r.a.createElement(w.a,null,o("Current bag"),". ",o("Select tokens to remove them")),r.a.createElement(oe,{tokenBag:n,showAverage:!1,onClick:function(e){return a(e)},fadeOutTokens:!0}),r.a.createElement(w.a,null,o("Select tokens to add them to the bag")),r.a.createElement(ue,{tokenBagSpec:i,onClick:function(e){return t(e)}}))}));function ue(e){var n=e.tokenBagSpec,t=e.onClick;return r.a.createElement("div",{className:"BagDisplay"},r.a.createElement("p",{className:"TokenStrip"},n.tokens.map((function(e,n){return r.a.createElement(V,{key:n,token:e,onClick:t,fadeOut:!1,fadeOutFadeIn:!0})}))))}var le=Object(Z.a)((function(e){return Object($.a)({paper:{position:"relative",left:"15%",top:"40%",width:"70%",opacity:.9,backgroundColor:e.palette.background.paper,border:"2px solid #FFF",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}})})),se=Object(G.b)((function(e){return{tokenBag:ae(e),scenario:e.selectedScenario}}))((function(e){var n=e.tokenBag,t=e.scenario,c=Object(a.useState)(!1),o=Object(i.a)(c,2),u=o[0],l=o[1],s=Object(L.a)().t;return r.a.createElement("div",{className:"Scenario"},r.a.createElement("div",{className:"ScenarioInfo"},r.a.createElement(w.a,{variant:"h3"},s(t.name)),r.a.createElement(ce,null),r.a.createElement(ne,null)),r.a.createElement(J,{tokenBag:n}),r.a.createElement(oe,{tokenBag:n,onClick:function(){return l(!0)},fadeOutTokens:!1}),r.a.createElement(W.a,{open:u,onClose:function(){return l(!1)},"aria-labelledby":"bag-management-title"},r.a.createElement(ie,{tokenBag:n})),r.a.createElement(K.a,{textAlign:"center"},r.a.createElement(X.a,{color:"secondary",onClick:function(){return l(!0)}},s("Manage chaos bag"))))}));var fe=t(142),me=t(143),de=t(141),pe=t(152),ge=t(74);var he=t(75),ve=t(47),Se=t(72),Ee=t(73),ke={JoeDiamond:{id:"JoeDiamond",name:"Joe Diamond",shortName:"Joe",elderSignEffect:function(){return 1}},DianaStanley:{id:"DianaStanley",name:"Diana Stanley",shortName:"Diana",elderSignEffect:function(){return 2}}};function be(){return v(m(1,1,!1,"elderSign"),m(1,1),m(0,2),m(-1,2),m(-2,2),m(-3,1),m(-4,1),m(0,2,!0,"Calavera"),b)}function Ce(){var e=function(e){return e.context["Doom and breaches on your location"]};return{name:"In the Clutches of Chaos",translations:{es:"En las garras del caos"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(n){return 0-e(n)}},{name:"Sectario",effect:function(n){var t=A(n,"Sectario");return t.context=Object(l.a)({},"Doom and breaches on your location",Math.max(3,e(n)+1)),O(t)}},{name:"L\xe1pida",effect:function(){return-2}},{name:"Antiguo",effect:function(){return-3}}],contextSpec:{valuesSpec:[{name:"Doom and breaches on your location",description:"Total amount of doom and breaches on your location",type:"number",initialValue:0,translations:{es:"Perdici\xf3n y brecha en tu lugar"}}]}}}function ye(){return{name:"Before the Black Throne",translations:{es:"Ante el trono negro"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return 0-Math.max(2,function(e){return Math.ceil(e.context["Doom on Azathoth"]/2)}(e))}},{name:"Sectario",effect:function(e){return O(A(e,"Sectario"))}},{name:"L\xe1pida",effect:function(){return-2}},{name:"Antiguo",effect:function(){return-4}}],contextSpec:{valuesSpec:[{name:"Doom on Azathoth",description:"Doom on Azathoth",type:"number",initialValue:0,translations:{es:"Perdici\xf3n en Azathoth"}}]}}}function Oe(){return{id:"TheCircleUndone",name:"The Circle Undone",scenarios:[{name:"Disappearance at the Twilight Estate",translations:{es:"Desaparici\xf3n en la finca del crep\xfasculo"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(){return-3}}],contextSpec:{valuesSpec:[]}},{name:"The Witching Hour",translations:{es:"La hora bruja"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(){return-1}},{name:"L\xe1pida",effect:function(){return-3}},{name:"Antiguo",effect:function(){return-3}}],contextSpec:{valuesSpec:[]}},{name:"At Death's Doorstep",translations:{es:"A las puertas de la muerte"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return e.context["Haunted location"]?-3:-1}},{name:"L\xe1pida",effect:function(){return-2}},{name:"Antiguo",effect:function(){return-2}}],contextSpec:{valuesSpec:[{name:"Haunted location",description:"Haunted location",type:"boolean",initialValue:!1,translations:{es:"Lugar embrujado"}}]}},{name:"The Secret Name",translations:{es:"El nombre secreto"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return e.context["Extradimensional location"]?-3:-1}},{name:"Sectario",effect:function(e){return O(A(e,"Sectario"))}},{name:"L\xe1pida",effect:function(){return-2}},{name:"Antiguo",effect:function(){return-3}}],contextSpec:{valuesSpec:[{name:"Extradimensional location",description:"Extradimensional location",type:"boolean",initialValue:!1,translations:{es:"Lugar Extradimensional"}}]}},{name:"The Wages of Sin",translations:{es:"La paga del pecado"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return 0-e.context["Unfinished business"]}},{name:"Sectario",effect:function(e){return e.context["Fighting/evading Heretic"]?-4:-3}},{name:"L\xe1pida",effect:function(){return-3}},{name:"Antiguo",effect:function(){return-2}}],contextSpec:{valuesSpec:[{name:"Unfinished business",description:"Unfinished business",type:"number",initialValue:0,translations:{es:"Asuntos inconclusos"}},{name:"Fighting/evading Heretic",description:"Fighting/evading Heretic",type:"boolean",initialValue:!1,translations:{es:"Atacando/Evitando Hereje"}}]}},{name:"For the Greater Good",translations:{es:"Por el bien com\xfan"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return 0-e.context["Max Doom"]}},{name:"Sectario",effect:function(e){return O(A(e,"Sectario"))-2}},{name:"L\xe1pida",effect:function(){return-3}},{name:"Antiguo",effect:function(){return-3}}],contextSpec:{valuesSpec:[{name:"Max Doom",description:"Highest number of doom on a Cultist",type:"number",initialValue:0,translations:{es:"M\xe1xima perdici\xf3n"}}]}},{name:"Union and Disillusion",translations:{es:"Uni\xf3n y desilusi\xf3n"},scenarioEffectSpec:[{name:"elderSign",effect:function(e){return e.character.elderSignEffect(e)}},{name:"Calavera",effect:function(e){return e.context["Circle action"]?O(A(e,"Calavera"))-2:-2}},{name:"Sectario",effect:function(){return-3}},{name:"L\xe1pida",effect:function(){return-3}},{name:"Antiguo",effect:function(){return-3}}],contextSpec:{valuesSpec:[{name:"Circle action",description:"This skill test is a circle action",type:"boolean",initialValue:!1,translations:{es:"Acci\xf3n c\xedrculo"}}]}},Ce(),ye()],bagSpecsByLevel:{easy:v(m(1,1,!1,"elderSign"),m(1,2),m(0,3),m(-1,2),m(-2,1),m(-3,1),m(0,2,!0,"Calavera"),b),normal:be(),hard:h(g(be(),"1"),m(-5,1)),expert:v(m(1,1,!1,"elderSign"),m(0,1),m(-1,2),m(-2,2),m(-3,1),m(-4,1),m(-6,1),m(-8,1),m(0,2,!0,"Calavera"),b)},translations:{es:"El c\xedrculo roto"}}}function xe(){var e,n,t=(e=[ke.JoeDiamond,ke.DianaStanley],n="normal",Te.start(Oe(),e,n));return t.addTokensToBagSpec(m(0,2,!0,"L\xe1pida"),m(0,1,!0,"Sectario"),m(0,1,!0,"Calavera")),t.startCampaign(0),t}var Ae={TheCircleUndone:Oe()},je=Object.values(Ae).reduce((function(e,n){var t=n.translations;return Object.keys(t).forEach((function(a){void 0===e[a]&&(e[a]={}),e[a][n.name]=t[a]})),n.scenarios.forEach((function(n){Object.keys(n.translations).forEach((function(t){void 0===e[t]&&(e[t]={}),e[t][n.name]=n.translations[t]})),n.contextSpec.valuesSpec.forEach((function(n){Object.keys(n.translations).forEach((function(t){void 0===e[t]&&(e[t]={}),e[t][n.name]=n.translations[t]}))}))})),e}),{}),Te=function(){function e(n,t,a,r){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;Object(Se.a)(this,e),this.name=n,this.campaignSpec=t,this.characters=a,this.currentBagSpec=r,this.currentScenario=0,this.startCampaign(c)}return Object(Ee.a)(e,[{key:"startCampaign",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.currentScenario=e;for(var n=0;n<=e;)this.currentScenario=n,n++}},{key:"getScenarioSpec",value:function(){return this.campaignSpec.scenarios[this.currentScenario]}},{key:"addTokensToBagSpec",value:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];this.currentBagSpec=h.apply(void 0,[this.currentBagSpec].concat(n))}},{key:"nextScenario",value:function(){return this.currentScenario+1<this.campaignSpec.scenarios.length&&(this.currentScenario++,this.currentScenario,this.campaignSpec.scenarios.length),this.getScenarioSpec()}},{key:"prevScenario",value:function(){return this.currentScenario>0&&this.currentScenario--,this.getScenarioSpec()}}],[{key:"start",value:function(n,t,a){return new e(n.name,n,t,n.bagSpecsByLevel[a])}}]),e}(),Ne=t(36),Ve=xe(),De=Ve.getScenarioSpec(),we=re(De.contextSpec),Be={skill:4,test:2},_e=Object(Ne.b)({selectedCampaign:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"NEXT_SCENARIO":return e.nextScenario(),e;case"PREV_SCENARIO":return e.prevScenario(),e;default:return e}},bagSpec:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve.currentBagSpec,n=arguments.length>1?arguments[1]:void 0,t=n;switch(n.type){case"ADD_TOKEN":return h(e,t.tokenSpec);case"REMOVE_TOKEN":return g(e,t.tokenSpec.name);default:return e}},selectedCharacter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve.characters[0],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"CHANGE_CHARACTER":return n.character;default:return e}},selectedScenario:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:De,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"CHANGE_SCENARIO":return n.scenarioSpec;default:return e}},gameContext:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"CHANGE_SCENARIO":return re(n.scenarioSpec.contextSpec);case"INC_DEC_CONTEXT_VALUE":var t=n,a=t.key;return Object.assign({},e,Object(l.a)({},a,S(e,a,t.incDec)));case"TOGGLE_CONTEXT_VALUE":var r=n;return Object.assign({},e,Object(l.a)({},r.key,!e[r.key]));default:return e}},skillTest:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Be,n=arguments.length>1?arguments[1]:void 0,t=n;switch(n.type){case"CHANGE_SKILL":return Object.assign({},e,{skill:s(e.skill,t.incDec)});case"CHANGE_TEST":return Object.assign({},e,{test:s(e.test,t.incDec)});default:return e}}});var Ie=function(){var e=function(){var e=localStorage.getItem("ahtok.kortsoft.net/state");return e?JSON.parse(e):void 0}();if(e){var n=Ae[e.campaignSpecId],t=e.characters.map((function(e){return ke[e]})),a=new Te(e.name,n,t,e.bagSpec,e.currentScenario),r=ke[e.currentCharacter];return{selectedCampaign:a,selectedScenario:a.getScenarioSpec(),selectedCharacter:r,skillTest:{skill:4,test:2},gameContext:e.currentContext,bagSpec:e.bagSpec}}var c=xe(),o=c.getScenarioSpec();return{selectedCampaign:c,selectedScenario:o,selectedCharacter:c.characters[0],skillTest:{skill:4,test:2},gameContext:re(o.contextSpec),bagSpec:c.currentBagSpec}}(),Le=Object(Ne.c)(_e,Ie);function Fe(e){localStorage.setItem("ahtok.kortsoft.net/lang",e),window.location.reload()}Le.subscribe((function(){var e=Le.getState().selectedCampaign,n={name:e.name,campaignSpecId:e.campaignSpec.id,bagSpec:Le.getState().bagSpec,characters:e.characters.map((function(e){return e.id})),currentScenario:e.currentScenario,currentCharacter:Le.getState().selectedCharacter.id,currentContext:Le.getState().gameContext};localStorage.setItem("ahtok.kortsoft.net/state",JSON.stringify(n))}));var He=t(104);var Me=Object(G.b)((function(e){return{campaign:e.selectedCampaign}}),(function(e){return{changeScenario:function(n){return e({type:"CHANGE_SCENARIO",scenarioSpec:n})}}}))((function(e){var n=function(){var e=localStorage.getItem("ahtok.kortsoft.net/lang");if(null===e){var n=navigator.language,t=n.indexOf("-");return t>-1&&(n=n.substring(0,t)),n}return e}();!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"es";he.a.use(ve.e).init({resources:{es:{translation:Object(u.a)(Object(u.a)({},je.es),{},{prev:"prev.",next:"sig.","Pass zone":"Zona de \xe9xito",Skill:"Habilidad",Test:"Dificultad","Bag average":"Valor medio","Current character":"Personaje actual","Manage chaos bag":"Gestionar bolsa del caos","Chaos bag":"Bolsa del caos","Current bag":"Bolsa actual","Select tokens to remove them":"Selecciona tokens para eliminarlos","Select tokens to add them to the bag":"Selecciona tokens para a\xf1adirlos a la bolsa"})}},lng:e,fallbackLng:"en"})}(n);var t=Object(L.a)().t,a=function(){var e=["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'],n="UglyQua";return{theme:Object(pe.a)(Object(ge.a)({typography:{fontFamily:[n].concat(e).join(","),fontSize:14},palette:{tonalOffset:1,type:"dark",primary:{main:"#205b57"},secondary:{main:"#f4ebcc"}}})),headerFontFamily:["Birmingham"].concat(e).join(","),headerFontFamilyNonAscii:[n].concat(e).join(",")}}(),c=e.campaign,o=t(c.name);return r.a.createElement(de.a,{theme:a.theme},r.a.createElement(fe.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(w.a,{style:{fontFamily:(i=o,/^[ -~]+$/.test(i)?a.headerFontFamily:a.headerFontFamilyNonAscii),textAlign:"center"},variant:"h2",color:"secondary",variantMapping:{h1:"header"},className:"App-header"},r.a.createElement(K.a,{style:{float:"right"}},r.a.createElement(He.GB,{className:"IconAction",onClick:function(){return Fe("en")},style:{width:"0.5em",opacity:"en"===n?"1.0":"0.4"}}),r.a.createElement(He.ES,{className:"IconAction",onClick:function(){return Fe("es")},style:{width:"0.5em",opacity:"es"===n?"1.0":"0.4"}})),o),r.a.createElement(me.a,{className:"MainContainer",maxWidth:"lg"},r.a.createElement(K.a,{textAlign:"center"},r.a.createElement(X.a,{color:"secondary",onClick:function(){return e.changeScenario(c.prevScenario())}},t("prev")),r.a.createElement(X.a,{color:"secondary",onClick:function(){return e.changeScenario(c.nextScenario())}},t("next"))),r.a.createElement(se,null)))));var i}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G.a,{store:Le},r.a.createElement(Me,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,n,t){e.exports=t(103)},90:function(e,n,t){},91:function(e,n,t){},92:function(e,n,t){}},[[85,1,2]]]);
//# sourceMappingURL=main.719f249b.chunk.js.map
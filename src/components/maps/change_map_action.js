import ChinaMapScatter from './china_map_scatter';
import '../../assets/styles/change_map.css';

const  dataUrlArr = {
    a1 : '/static/apis/ThreatSituation/ChinaMapData1.json',
    a2 : '/static/apis/ThreatSituation/ChinaMapData2.json',
    a3 : '/static/apis/ThreatSituation/ChinaMapData3.json',
    a4 : '/static/apis/ThreatSituation/ChinaMapData4.json'
}
const mark1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAABECAYAAACbO/V0AAADCUlEQVRYhbWYvYsUQRDFfz3b5+GBgYgiosFpoGiggUYGBkaCf4CB4F9gZHiBiIGRiaGBiZlmmhiZCCZyGGlwiSj4hQh+IKe7210G0ytzu2+53mJsWG7Zm3mvq+rV65oJduc8C6zQ+W41N8Q5vzfADmA3sB/YA6wAu8r/fgE/gW/AJ+AL8EeRxs7fFeAAcBDYB1wETgJfgQ/AO2CjgJ8AjgCrwF7gJfCkXPcG+Aj8BiwCF4Al4ChwrJCtAu+B78CZbbKwXnZ+pdxDIXkBjCKwCZwC3gKfy4U/gHPAQ+ARsEyb/0kKlkuqJjU5DRwCMvAUeF029ixiNgSeE8Llks8bwF1gJ3B1zq6tfCYEibYej2lrdwmze8BmBDNgiNl9QnMNOAycBcbbpGZ6BeAmcBzLt2hrRezAjCDfZqlZK5FM73haokFcs84or9GmnZYgWFdaQ8bpOnHwasHdt2ucHkzT6j4wq2qimhU1mBNfYE2KvHWNSV6GWQIT222cEWRpFXkWzRpnBLNYOoLgLLLAilgWFzpzJLAiUjJZsNZRzBJkkY7gVJHAmkPgrIEkUH0QrMc+UBGo32qWjkD6gjMCLVMRQfDKVKVIWYVXRSqCIDTvtQqBFUkiRSH7CASWLrJKW91SKVJ9kBc98Mt9SqZJEJjTi7RV/G8VKavIysNrloxAqIjgjECrSO3WaxWiDyyJCJyNJrDmnAfORqt2U+vTTZVVNMmnImkVanTMzhNNjo5ZdG1qfFYhsPTghTcCfR6IFDW+Gggs3clemcojU44tXoLa8X3xB8BCUNsHIfTYB2okNvNFILAi4x7tWmDpGni9SNZAydQ7F8kDRzaaU6ay0ZI69J1ThcDSKcrBa3aVnaxmpaolO7nHCKQXqRpEp13LGigV0addywdxp4rkg7gqqPv5QE7XogaDPvtAqSh5J7vasSXJebWCQKVIObM5H2MFln4AGfTYB2bN7EbMNzoqrBiSGN+DL0UKa8t0bYNB+eI70QKCoFv4kP7huiJQgozWeRfceSvsI5h5nQ1/AR4W1O01bb2vAAAAAElFTkSuQmCC'
const mark2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAABnUlEQVRYhe3WPWsUURTG8d/IaCAgIkENIULUIoKFRZImFlsH8hGEfIiUkRRa2PgJLGxsAnZWAcHCVkM6izQhAfNCCLiEvK6bsZg7sIwbdjOyzE7IgWGGM2fu/5zn3HuYKKnXXMKiluekmw/iC/w3cAt3MYwhDOJ2eHeIA/zGDvZw2g4at9wHMYJR3McsnmMfW9jEWlj8GZ7gEe5hFcshbh3bOEESYwY3MY6nATYWguuY6qDCSsh8Dr+Cbx3f0YhxhGlsYDcEHqCGT/iMAan+mQQDQaqsJ5N4iHN8xc+Q2LcoqdemQwUvg55f8B4PcOeCrJNwZYCmtB9vpL2bwAccxSHwDB8xj8d4gT8dpMlbhNfS/ryV9koGECDv8CpUks84v0WjNjE/sIDjzNkKyCCLUg2L2FLekQdkdl4Q0PYcXE1AV3PmfwDNSgHa6V0U8M9apTW55xJddg5lVo5EpVTQ83NQtIL+kaj6TW4UBPRPBdXfRT0fdmcFAf1TQfV3UdGD1j/j+npUdARcn4PyAdX6ban+33UpgGpJ1FVgUfsLQC3HcsLwiVEAAAAASUVORK5CYII=';
const mark3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAoCAYAAADkDTpVAAABkklEQVRIid3WvWoUYRTG8d8bZg0IIiIaCYqKgoKFShKMlYWNhRdgI96BjZ1YKXgRgr1gZyUIFrYqdhY2CYJfiCCIXxPjWMwZCLtvSHbYNTs5MLC8c/Y85/mfM8wkZWWISGt+b+qPxTrnU9iBPTiAvdiJXXHvO77hKz7iM37nRFM4KKLALA5iPy7jNL7gPd7iTRQ/jmM4in14hceRt4QP+IUqKatL0e0JnAyxI5F8GGc3oPASy+H0XZwt4TlWCvzEmejwE66F/Qt4iEeYVvNvEEwHqmYm8ziEv3iK11jAs6SszqOHq8HzCe5hBrvX6bqKqxFYVc/jTtCYw338SMpqMZJ6uKFmfB1/NkDTHwm3cQp3o46krM6tSerhFi5mOu5f0ZTJeYGbauwagYVMN1eG7L6JB/0HhfwDs9pSYKBWoZ78qAQGav0XgRyiYTeoiclB1NbB5AisjFug+w66JZDb+bKlwECtLUPU1sHkCHRri7YnopE62JI3WrdmkEPUVmDTiMbuYKRfdmPfou47yEVu8K3iH2pgpFQnyF+2AAAAAElFTkSuQmCC';

export default {
  name: 'ChangeMapAction',
  components: {
    'ChinaMapScatter': ChinaMapScatter
  },
  template: `<div style="width:100%;height:100%">
    <div class="map-list">
        <ul>
            <li><a href="jvascript:;" :class="selected == 'a1' ? 'selected' : ''" v-on:click="changeMap('a1')">资产总数</a></li>
            <li><a href="jvascript:;" :class="selected == 'a2' ? 'selected' : ''" v-on:click="changeMap('a2')">资产漏洞</a></li>
            <li><a href="jvascript:;" :class="selected == 'a3' ? 'selected' : ''" v-on:click="changeMap('a3')">未解决漏洞</a></li>
            <li><a href="jvascript:;" :class="selected == 'a4' ? 'selected' : ''" v-on:click="changeMap('a4')">威胁情报</a></li>
        </ul>
    </div>
    <div class="maps">
        <ChinaMapScatter :dataUrl="dataUrl" :symbol="symbol" />
    </div>
  </div>`,
  data () {
    return {
      selected: 'a1',
      dataUrl : dataUrlArr.a1,
      symbol:function(val){
        if(val[2] <= 1000){
          return 'image://' + mark3;
        }else if(val[2] <= 2000 && val[2] > 1000){
           return 'image://' + mark2;
        }else{
          return 'image://' + mark1;
        }
      }
    }
  },
  methods:{
    changeMap : function(msg){
        this.selected = msg;
        this.dataUrl = dataUrlArr[msg];
    }
  }
}

import historySurf from "./HistorySurf"

let n = 0 
class MenuSign
{
    process(ul){
        ul.classList.add('menu')
        ul.innerHTML = `<li>1234567890abcdefghijklmnopqrstuvwxyz</li>
                    <li>1234567890.,+-×÷/⋅%</li>
                    <li>∠∟°′″⊥∥~ΔÆæ£€¥¢$§♥♠♣♦♫♪▼▲►◄☺☻♂♀</li>
                    <li>⋂⋃|⊆⊄⊂⊇⊃⊖∈∉Ø^∨¬⇒⇔∀∃∄Ý∴∵εƒ∫∮∯∰∇</li>
                    <li>#+-/⋅×÷.,=≠≈≅<>≤≥±%‰!mod?()[]</li>
                    <li>{}ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκ</li>
                    <li>ΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω</li>
                    <li>!@#$%^&*</li>`
        

        /*

        '∠∟°deg′″⊥∥~ΔÆæ£€¥¢$§♥♠♣♦♫♪▼▲►◄☺☻♂♀',
            '≡≜∝→∞←↔↨≪≫⌊⌋⌈⌉∘∑∏e⊗†*…©®™',
            '⋂⋃|⊆⊄⊂⊇⊃⊖∈∉Ø^∨¬⇒⇔∀∃∄Ý∴∵εƒ∫∮∯∰∇',
            '#+-/⋅×÷.,=≠≈≅<>≤≥±%‰!mod?()[]',
            '{}ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκ',
            'ΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω',
            '1234567890abcdefghijklmnopqrstuvwxyz'
        */
        setTimeout(()=>{
            historySurf.goToEnding()
            console.log('**********************************************************')
            document.querySelectorAll('li').forEach(element => {
                element.addEventListener('click', (e)=>{
                    
                    let string = e.target.innerText
                    let n = 0
                    document.querySelectorAll('div.KeyBoard div div.btn-content').forEach(btn => {
                        console.log(btn.innerText, n, string, string[n])
                        btn.innerText = (typeof string[n] !== 'undefined')?string[n]:btn.innerText
                        n++
                    });
                })
            });
        }, 1000)
    }
}

const menuSign = new MenuSign()
export default menuSign
(function () {
    const FONT_NAME = 'Caveat';
    const FONT_SIZE = 45;

    function drawTextRect(text, ctx, rect, font) {
        let words = text.split(/\s+/);
        let lines;
        for (let fontSize = font.minSize; fontSize <= font.maxSize; fontSize++) {
            ctx.font = fontSize + 'px ' + FONT_NAME;
            lines = [];

            let lineHeight = fontSize * 1.16;
            let lineBottom = rect.y + fontSize;
            let lineText = '';
            for (let word of words) {
                let candidateText = lineText + word;
                if (ctx.measureText(candidateText).width > rect.width) {
                    lines.push({ text: lineText, bottom: lineBottom });
                    lineText = word;
                    lineBottom += lineHeight;
                } else {
                    lineText = candidateText;
                }
                lineText = lineText + ' ';
            }
            lines.push({ text: lineText, bottom: lineBottom });

            if (lineBottom > rect.height) break;
        }

        for (var line of lines) {
			ctx.fillText(line.text, rect.x, line.bottom);
        }
    }

    function drawCenteredText(text, ctx, x, y, maxWidth) {
        ctx.font = FONT_SIZE + 'px ' + FONT_NAME;
        let textWidth = ctx.measureText(text).width;
        x = Math.max(x + Math.floor(maxWidth / 2) - Math.floor(textWidth / 2), x);
        ctx.fillText(text, x, y + 35, maxWidth);
    }

    window.onload = function () {
        function updatePostCard() {
            ctx.drawImage(image, 0, 0);
            drawCenteredText(from.value, ctx, 185, 365, 500);
            drawCenteredText(to.value, ctx, 185, 413, 500);
            drawTextRect(message.value, ctx, { x: 180, y: 25, width: 504, height: 225 }, { minSize: FONT_SIZE, maxSize: 60 });
        }

        function copyToClipboard() {
            imageCopy.src = canvas.toDataURL('image/png');

            let range = document.createRange();
            range.setStartBefore(image);
            range.setEndAfter(image);
            range.selectNode(image);

            let selection = window.getSelection();
            selection.addRange(range);

            document.execCommand('Copy');
        }

        function saveToFile() {
            saveButton.href = canvas.toDataURL('image/png');
        }

        let image = document.getElementById('template');
        let imageCopy = document.getElementById('template');

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = '#EEE';

        let from = document.getElementById('from');
        from.addEventListener('input', updatePostCard);

        let to = document.getElementById('to');
        to.addEventListener('input', updatePostCard);

        let message = document.getElementById('message');
        message.addEventListener('input', updatePostCard);

        let copyButton = document.getElementsByClassName('copy-img')[0];
        copyButton.addEventListener('click', copyToClipboard);

        let saveButton = document.getElementsByClassName('save-img')[0];
        saveButton.addEventListener('click', saveToFile);

        updatePostCard();
    }
})();
(function () {

    class Enlarge {
        constructor (options = {}) {
            options = Object.assign({
                id: 'show-image', // Todo：id可能为 ID 或 class等
                url: './image/demo.jpg'
            }, options)
            this.id = options.id
            this.url = options.url
            return this
        }

        // 初始化开启
        init () {
            this.$container = document.getElementById(this.id)
            if (this.$container) {
                this.addImageDom()
                this.addZoneDom()
                this.addLargeDom()
                this.$container.addEventListener('mousemove', this.bindHover.bind(this))
                document.addEventListener('mouseover', this.hideDom.bind(this))
            }
        }

        addImageDom () {
            if (this.$image) return
            const image = new Image()
            image.src = this.url
            image.classList.add('image-body-full')
            this.$container.appendChild(image)
            this.$image = image
            this.imageWidth = this.$image.clientWidth
            this.imageHeight = this.$image.clientHeight
            // 缩小到100px的宽度
            const proportion = 100 / this.imageWidth 
            this.zoneWidth = Math.floor(this.imageWidth * proportion)
            this.zoneHeight = Math.floor(this.imageHeight * proportion)
        }

        addZoneDom () {
            if (this.$zone) return
            const zone = document.createElement('div')
            zone.classList.add('zone-box')
            zone.style.width = `${this.zoneWidth}px`
            zone.style.height = `${this.zoneHeight}px`
            this.$container.appendChild(zone)
            this.$zone = zone
        }

        addLargeDom () {
            if (this.$large) return
            const large = document.createElement('div')
            large.classList.add('large-box')
            large.style.width = `${this.imageWidth}px`
            large.style.height = `${this.imageHeight}px`
            this.$container.appendChild(large)
            this.$large = large
        }

        // 图片绑定 hover 事件
        bindHover (e) {
            const { x, y } = e
            if (!this.$image || !this.$zone) return
            const offsetX = Math.max(x - this.$container.offsetLeft, 0)
            const offsetY = Math.max(y - this.$container.offsetTop, 0)
            const halfX = Math.floor(this.zoneWidth / 2)
            const halfY = Math.floor(this.zoneHeight / 2)
            let top = 0
            let left = 0
            if (offsetY <= halfY) {
                top = 0
            } else if (offsetY > halfY && offsetY <= (this.imageHeight - halfY)) {
                top = offsetY - halfY
            } else {
                top = this.imageHeight - this.zoneHeight
            }
            if (offsetX <= halfX) {
                left = 0
            } else if (offsetX > halfX && offsetX <= (this.imageWidth - halfX)) {
                left = offsetX - halfX
            } else {
                left = this.imageWidth - this.zoneWidth
            }
            this.$zone.style.top = `${top}px`
            this.$zone.style.left = `${left}px`
            this.$zone.style.display = 'block'
            this.showEnlargeImage(top, left)
        }

        // 显示大图
        showEnlargeImage (top, left) {
            if (!this.$large) return
            const radioX = this.imageWidth / this.zoneWidth
            const radioY = this.imageHeight / this.zoneHeight
            const widthSize = Math.floor(this.imageWidth * this.imageWidth / this.zoneWidth)
            const heightSize = Math.floor(this.imageHeight * this.imageHeight / this.zoneHeight)
            this.$large.style['background-image'] = `url(${this.url})`
            this.$large.style['background-size'] = `${widthSize}px ${heightSize}px`
            this.$large.style['background-position'] = `-${left * radioX}px -${top * radioY}px`
            this.$large.style.display = 'block'
        }

        hideDom () {
            this.$zone && (this.$zone.style.display = 'none')
            this.$large && (this.$large.style.display = 'none')
        }
    }

    const enlarge = new Enlarge()
    enlarge.init()
})()

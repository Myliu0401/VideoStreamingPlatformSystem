<template>
    <div class="paging">
        <i class="iconfont icon-xiangzuo arrow" @click="switchPages" data-type="lastPage"></i>
        <ul class="pagesBox" @click="switchPages">
            <li class="item iconfont" v-for="num, index in buildPageCount()" :key="num + index" :class="{
            active: activePage == num,
            dots: num === '...',
            left: num === '...' && index == 1,
            right: num === '...' && index !== 1
        }" :data-type="num === '...' ? index == 1 ? 'left' : 'right' : num">
                {{ num === '...' ? '' : num }}
            </li>
        </ul>
        <i class="iconfont icon-arrow- arrow" @click="switchPages" data-type="nextPage"></i>
    </div>
</template>



<script>
export default {
    props: {
        total: {
            default: 100
        },
        quantity: {
            default: 10
        },
        currentPage: {
            default: 1
        },

    },
    data() {
        return {
            activePage: this.currentPage,

        }
    },

    computed: {
        // 总页数
        pageCount() {
            return Math.ceil(this.total / this.quantity);
        },

        startEndPage() {

            let sta = this.activePage - 2 > 2 ? this.activePage - 2 : 2;
            const end = sta + 4 > this.pageCount - 1 ? this.pageCount - 1 : sta + 4;

            return {
                start: this.pageCount <= 7 ? end : sta - (4 - (end - sta)),
                end: end
            }
        },

    },

    created() {
        window.aa = this;
    },

    methods: {

        // 构建页数
        buildPageCount() {
            const start = this.activePage - 2 > 2 ? true : false;
            const end = this.activePage + 2 < this.pageCount - 1 ? true : false;

            const obj = this.startEndPage;

            const arr = [1];

            for (let i = obj.start; i <= obj.end; i++) {
                if (this.pageCount < 7) {
                    arr.push(i)
                    continue;
                };

                if (i === obj.start && start || i === obj.end && end) {
                    if (i === obj.start) {
                        arr.push('...');
                        arr.push(i);
                    } else {
                        arr.push(i);
                        arr.push('...');
                    };
                } else {

                    arr.push(i);
                };


            };

            arr.push(this.pageCount);

            return arr;

        },

        // 切换页数
        switchPages(e) {
            const index = e.target.dataset.type;
            if (index === 'lastPage' && this.activePage === 1
                || index === 'nextPage' && this.activePage === this.pageCount
                || index == this.activePage) {
                return;
            };

            if (index === 'lastPage') {
                this.activePage = this.activePage - 1;
            } else if (index === 'nextPage') {
                this.activePage = this.activePage + 1;
            } else if (index === 'left') {
                this.activePage = this.activePage - 4 < 1 ? 1 : this.activePage - 4;
            } else if (index === 'right') {
                this.activePage = this.activePage + 4 > this.pageCount ? this.pageCount : this.activePage + 4;
            } else {
                this.activePage = +index;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.paging {
    display: flex;
    align-items: center;

    .arrow {
        display: flex;
        justify-content: center;
        cursor: pointer;
        width: 20px;
        height: 20px;
        display: inline-block;
        color: #4fbbb9;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            color: #60fffc;
        }

        &:last-child {
            margin-left: 6px;
        }
    }

    .icon-xiangzuo {
        &::before {
            font-weight: bold;
        }
    }


    .pagesBox {
        display: flex;
        align-items: center;

        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4fbbb9;
            width: 25px;
            height: 20px;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
                color: #60fffc;
            }

            &.active {
                color: #60fffc;
            }

            &.dots {

                &::before {
                    content: '...';
                }

                &.left:hover {

                    &::before {
                        content: '\eb0a';
                    }
                }

                &.right:hover {
                    &::before {
                        content: '\eb09';
                    }
                }
            }

        }
    }


}
</style>
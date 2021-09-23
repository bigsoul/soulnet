PGDMP                          y            soulnet    12.4    12.4     4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    27758    soulnet    DATABASE     �   CREATE DATABASE soulnet WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE soulnet;
                snadmin    false            �            1259    44161    DataFile    TABLE     �   CREATE TABLE public."DataFile" (
    "Id" uuid NOT NULL,
    "Name" character varying(256) NOT NULL,
    "Ext" character varying(32),
    "Size" integer NOT NULL,
    "CRC32" integer NOT NULL
);
    DROP TABLE public."DataFile";
       public         heap    postgres    false            �            1259    36084    Dataset    TABLE     �   CREATE TABLE public."Dataset" (
    "Id" uuid NOT NULL,
    "Name" character varying(100) NOT NULL,
    "IsLoaded" boolean DEFAULT false NOT NULL,
    "Description" character varying(1024) NOT NULL,
    "DataFileId" uuid
);
    DROP TABLE public."Dataset";
       public         heap    snadmin    false            �            1259    36111    Learning    TABLE     �  CREATE TABLE public."Learning" (
    "Id" uuid NOT NULL,
    "Name" character varying(100) NOT NULL,
    "State" integer DEFAULT 0 NOT NULL,
    "IsArchive" boolean DEFAULT false NOT NULL,
    "IterationCount" integer NOT NULL,
    "IterationCurrent" integer DEFAULT 0 NOT NULL,
    "InputNeuronsCount" integer DEFAULT 0 NOT NULL,
    "DeepLayersCount" integer DEFAULT 0 NOT NULL,
    "DatasetId" uuid NOT NULL
);
    DROP TABLE public."Learning";
       public         heap    snadmin    false            �            1259    36098    Testing    TABLE     �  CREATE TABLE public."Testing" (
    "Id" uuid NOT NULL,
    "Name" character varying(100) NOT NULL,
    "State" integer DEFAULT 0 NOT NULL,
    "IsArchive" boolean DEFAULT false NOT NULL,
    "IterationCount" integer DEFAULT 0 NOT NULL,
    "IterationCurrent" integer DEFAULT 0 NOT NULL,
    "StopLossPercent" real DEFAULT 0 NOT NULL,
    "StartDeposit" real DEFAULT 0 NOT NULL,
    "EndDeposit" real DEFAULT 0 NOT NULL,
    "LearningId" uuid NOT NULL,
    "DatasetId" uuid NOT NULL
);
    DROP TABLE public."Testing";
       public         heap    snadmin    false            �            1259    36090    User    TABLE     �   CREATE TABLE public."User" (
    "Id" uuid NOT NULL,
    "Username" character varying(60) NOT NULL,
    "Email" character varying(60) NOT NULL,
    "Password" text,
    "DataCreate" timestamp with time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap    snadmin    false            1          0    44161    DataFile 
   TABLE DATA           J   COPY public."DataFile" ("Id", "Name", "Ext", "Size", "CRC32") FROM stdin;
    public          postgres    false    206   �"       -          0    36084    Dataset 
   TABLE DATA           Z   COPY public."Dataset" ("Id", "Name", "IsLoaded", "Description", "DataFileId") FROM stdin;
    public          snadmin    false    202   �"       0          0    36111    Learning 
   TABLE DATA           �   COPY public."Learning" ("Id", "Name", "State", "IsArchive", "IterationCount", "IterationCurrent", "InputNeuronsCount", "DeepLayersCount", "DatasetId") FROM stdin;
    public          snadmin    false    205   E$       /          0    36098    Testing 
   TABLE DATA           �   COPY public."Testing" ("Id", "Name", "State", "IsArchive", "IterationCount", "IterationCurrent", "StopLossPercent", "StartDeposit", "EndDeposit", "LearningId", "DatasetId") FROM stdin;
    public          snadmin    false    204   �J       .          0    36090    User 
   TABLE DATA           U   COPY public."User" ("Id", "Username", "Email", "Password", "DataCreate") FROM stdin;
    public          snadmin    false    203   �L       �
           2606    44168    DataFile PK_DataFile_Id 
   CONSTRAINT     [   ALTER TABLE ONLY public."DataFile"
    ADD CONSTRAINT "PK_DataFile_Id" PRIMARY KEY ("Id");
 E   ALTER TABLE ONLY public."DataFile" DROP CONSTRAINT "PK_DataFile_Id";
       public            postgres    false    206            �
           2606    36089    Dataset PK_Dataset_Id 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Dataset"
    ADD CONSTRAINT "PK_Dataset_Id" PRIMARY KEY ("Id");
 C   ALTER TABLE ONLY public."Dataset" DROP CONSTRAINT "PK_Dataset_Id";
       public            snadmin    false    202            �
           2606    36119    Learning PK_Learning_Id 
   CONSTRAINT     [   ALTER TABLE ONLY public."Learning"
    ADD CONSTRAINT "PK_Learning_Id" PRIMARY KEY ("Id");
 E   ALTER TABLE ONLY public."Learning" DROP CONSTRAINT "PK_Learning_Id";
       public            snadmin    false    205            �
           2606    36105    Testing PK_Testing_Id 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Testing"
    ADD CONSTRAINT "PK_Testing_Id" PRIMARY KEY ("Id");
 C   ALTER TABLE ONLY public."Testing" DROP CONSTRAINT "PK_Testing_Id";
       public            snadmin    false    204            �
           2606    36097    User PK_User 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "PK_User" PRIMARY KEY ("Id");
 :   ALTER TABLE ONLY public."User" DROP CONSTRAINT "PK_User";
       public            snadmin    false    203            �
           1259    44174    IX_Dataset_DataFileId    INDEX     U   CREATE INDEX "IX_Dataset_DataFileId" ON public."Dataset" USING btree ("DataFileId");
 +   DROP INDEX public."IX_Dataset_DataFileId";
       public            snadmin    false    202            �
           1259    36145    IX_Learning_DatasetId    INDEX     U   CREATE INDEX "IX_Learning_DatasetId" ON public."Learning" USING btree ("DatasetId");
 +   DROP INDEX public."IX_Learning_DatasetId";
       public            snadmin    false    205            �
           1259    36151    IX_Testing_DatasetId    INDEX     S   CREATE INDEX "IX_Testing_DatasetId" ON public."Testing" USING btree ("DatasetId");
 *   DROP INDEX public."IX_Testing_DatasetId";
       public            snadmin    false    204            �
           1259    36157    IX_Testing_LearningId    INDEX     U   CREATE INDEX "IX_Testing_LearningId" ON public."Testing" USING btree ("LearningId");
 +   DROP INDEX public."IX_Testing_LearningId";
       public            snadmin    false    204            �
           2606    44175 &   Dataset FK_Dataset_DataFile_DataFileId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Dataset"
    ADD CONSTRAINT "FK_Dataset_DataFile_DataFileId" FOREIGN KEY ("DataFileId") REFERENCES public."DataFile"("Id") ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."Dataset" DROP CONSTRAINT "FK_Dataset_DataFile_DataFileId";
       public          snadmin    false    202    206    2730            �
           2606    36146 &   Learning FK_Learning_Dataset_DatasetId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Learning"
    ADD CONSTRAINT "FK_Learning_Dataset_DatasetId" FOREIGN KEY ("DatasetId") REFERENCES public."Dataset"("Id") ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."Learning" DROP CONSTRAINT "FK_Learning_Dataset_DatasetId";
       public          snadmin    false    205    202    2719            �
           2606    36152 $   Testing FK_Testing_Dataset_DatasetId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Testing"
    ADD CONSTRAINT "FK_Testing_Dataset_DatasetId" FOREIGN KEY ("DatasetId") REFERENCES public."Dataset"("Id") ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public."Testing" DROP CONSTRAINT "FK_Testing_Dataset_DatasetId";
       public          snadmin    false    202    204    2719            �
           2606    36158 &   Testing FK_Testing_Learning_LearningId    FK CONSTRAINT     �   ALTER TABLE ONLY public."Testing"
    ADD CONSTRAINT "FK_Testing_Learning_LearningId" FOREIGN KEY ("LearningId") REFERENCES public."Learning"("Id") ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public."Testing" DROP CONSTRAINT "FK_Testing_Learning_LearningId";
       public          snadmin    false    205    2728    204            1      x������ � �      -   c  x�M��nU1��s��H, �$v�v���K>�[um�L/H�;RUqEz�
9o�KeǱ���v\� r+��D �;T���>�z�\~��X�:���Xu�Tﴷ��"����y/�}��<N����ݏ��<��ã�i���65���i�^�o����~����P�% x��R�*���S�][Y����ju����ê��������I����8U�hr3�ˇrWn�n}c�{���$��>�&���z(L�g�`�l�������,��� �(��v&uΒ�u6����	ƅX S@��Z+�X}�@�h�>ܨ�p}�>�ԫ��V��&�`�8.�Wv�u�����~���Ů�      0      x��]��d9v���b ��� O�5��WA� ��C7�ɲ�Nwv��d�<K�ٮW��-�L�����4'Δ��s����?f����?��o�b�˾�+��o���r��R���=��6��:fY%����"3y<4}2��25���͒T���%ʿ>k���+b��#��'��Lkm���*�M��(yYiX�dM�oRM�T����~��E\��"1b���:j}�&�j����V{�!��u�Cz�������2L�VZ0��l��������s��Ο�hË��^G���>�	+*� �������X�'^�g�G�؊븟���63�fnh���u�ޏ����uz����L�~V���O��%�i��R�u�� ^ȁ=���Wr� �^��ӆn�
NǱNz����_��Z�-�4pd!���<b��q�c���C9�߯���R�����i�������t�r�߯�W�2R4�f�c�X��)hn%�8깟��C9��=?�Hs�C� �j��+�T��s�d��q�|�z;2�X#�!�8�5h�/%4�D���{?�F�������٬�����!oe���*��:�8�A����R����}�X����H}��x�A���A҅=eg-�[ȵM���Qi͗�_�s���A҅=���L�^MZ�aHn��ps�v4m{�)7����b4^�N�QP���-y��c�m<���x��\3쁝87Ũ�Y]��)b??��=�{ 1D�}3�&ڷ,�񥙴�m��SOy���S.�A�7-ժ�J{P��'��K�Ն�z��큧\��(I�@z:&�i˔��hŎb{��=�� f�)�aV�
щ��da%E.��l{�?����ڪ�%���G��2%b{m�`�8dۃ 9��`���ݤ����]l�Kɽ�c�����/�4�'d�؆%�Z���{�X�s��������3��>'6طH���x�|\��\G�[�|�?���Y���=����yx�� �!�eS>�y�/������}ˮ�%��:M��>CS���\ǽ�1"?�ߊ�Qࠉ��i�@�G�b ��\�mw�����^��� ;֙�:�efPq��s?e���q7�`�� �f��N��ԍ�����uȁ��?�<`aK�<����Qm���f:�y��l~�~��VL.	r���MѪ��Z9�ͻ�܏��yIw
���P���h���Y+�C����\�| s���E������x֚FS�9{ʁ{?����I6%_G2X�L[l���ܱ��'���~��I�my����&,w3j˱���L9��S�RKL��x(egp�Md���l=͔�=m��:���z���5��F��q�G�~(�m�$���9 �)4��Z�g�����8?o��� F���� Q�$N#����4�7�7W8�	�6�C{��LYv:H�*��ꔷ����ʍ�����6��x�g��"!��X�z�������������?;��x�%_�]Δ	�Ï���
ǵ�-p����j�f9����9��ޯ
S�j��m����0jj2 �a�+��P�gO�2Y����R�6?�uCy���1M�а��
jmFm
H�|?����"XBot��QL\��j
����P[�S�w�E,t�B�p,�Tد:M��L��;1z�~��c}[���7$$�?N��\7Vn&�������|?6�`�(�#�����[�0��2g��p��m��(��.C�5H]f�끟RWH������|���|?�n֥�i�n��k����R��lA����<� ���L`�  P�L}�ݫMi|r��6��n�|a�C��N�p���!b�h�VͶ�v0���~a� 3G��_��p1�ۜ5�3@�|�@���Gh��b��$�0-":`��'h*��Jx���S ��EK�9.J�j�7������ �7!�\`���B :h� 2_3L=�K�y������/`(��5S�\�c�"���lK�0bqi�5e��� ��=�N��"j�8��^�8/�����}��
l� ��5��T|�[��I� �FM�CYj��-w�|�y`�@�pÝc̥5��^���-��YZ���t�[��o"BPkd��`�����9��R�����?�]x|��Qx��e�l�V�	b�W9rEy{���F`�G��_]�E��5=g��Ta]�����V���ȯ�^����'q@�UFre�nv�C�պO�l��U _Q�l�+p\[Y� ��
�֝?X���7:��|����CAJ�6��C��^K]+7�9y&���m���0��
�5������O�O<��𘟿���e��ٹ��'�F����,�ұ���+,(?n`u��x? �(\�q��	2sp��9�����?����A-JA�����հ�e>�@w�L�}�M�ÁC�����B���0�L:���������sN-��"�1\�M�/\N? ��c 7�W��*1�Wb"���-Ӓ��0;�&�3795B,?�Cc38R�b�6(n��O��7��Z�z#Ot�c%P����J��~Xx�f����fBnkY�E,4���(�:�IU�p�q�1���c�Ov��a��������-픝��]e�&\	�6|
l03�N���2�7|�}�	@<_P$�1�F�v����5��$�c�4c���Ooޫ����E���m��;�]ǝGP���gR}ǲ_�	e�k>F�2Ty�u&K����|���s�/kFxU�=Y�M�c[Y�L���[�z3y�5���%�����4S\��ǭ��{-��n���&T�,�%�l����6�i��vf����܎�&�����V �-�%0��3Ӝ���#ϴ�f����"L/��O�<�pX0�%�
�}�׎Yf���AJ���ߝgr�C�s/���	���z&}.��8��K ܇-��aR �z�q���+�vn����S�<�!��R��@œ�V�CSvM��uS!_Ov�O8yX��[`��*� J?a�{�-��b����2��ٷ�[-��,6 �ק���{��M��6�ka��[�����J��Vv���*cQ�((�����Iߠ`G����󩎻�D>�BU��ߍ=�!^�ς�t�Ҳr��~� W�ߜOI�T�����R3OI����[[oPki`/K�z`�ɂ3}d��$��Nv!�@o����O.�y�������J�V���k�e�^_,p�F�&��F�%�� Ȏ�s�`���q;X�9��V;�"B
���Y`Z�/;0y8�H�R�Y��B��|Y��P��B0�
��#ϑ|=������rq`U|��Q�����kip�F�#���y��)�P�����;��@��*Ō0}�%���DvfOI�_��.-���Ox0����CN����+�e��S�	L�@��Y��w� ��iSeEP���Rv8�&V���,�5����Hol�a���J��~W�0�vS SW�+T(��=�V����^j"�H ��ރz_h}1���U��+�/Pq����7!��Í��˲P%�1�: �2})d��I����]7�-�Ūq��>��tf���충=�������T�ꂱ�G�qG@�L�]=DM��Rt��^z�����t������+�����Tx�
\s�P,��#"��Z�<�=�:��Oٱ��\d�>8��/T����quYqC_^�}^�uq\�+�`�+懪 J>��WM�Q?o^veObE��"c�F�Y���2�,��	R_♗�^�a�}��C��
�B�<��`� F��r��X�njA���@x�������T�)] ���Gl��	��M�Z�Ya@��,t��l@6�؞Ѷ]�& 7uj�:;Vo$��XA�pF�m���n��,��&�m�D�o �BX��B8{�`v�.U�o����҇���    B.��NaƎjU��|خ�eU�Mn��
�*��g�:�4��/���I�u�h�W�d�n�-�l ����E��VU>��z��_ռ�օL>6�
Ib�?��?�S�����XH�.4�-V��F��͔�k�����灕���1r��*�W�;ԣOs���Tt8��݁\�r��.�Dvl�81�@d\�"�E @ʽj;�e�F.8�|�\�..���R�;$������Z�����J�do�
��eA[�g a�܋��bǧ����A�����$.xV Y��5��4J���I:�����a��<����G��b�Ks����F(ۆ�*��Z,ӐγB���hv��5��{\�Շ֗��j].�X��[q0F�G"9�Gdz_ ��ٛ��mbbe�� �qBE����qX}��j _�!���	dL*ɤ4�=DY�I6�*�I���α&Yn�,md�%C!UT�n�LF�L[��딽}�� b�O���:�Aŋ%��R�ܑju%�dw��a��J��f\w 'm �_l���ώ���yu�B;�����QD8����cX��:� �a����wiXt�~���_�d�~C?����+�� ��f�{��1�J��I@�`��O�:G���0�����2��=�P�� t�5f�=�y9����	�rp�p�����6LZ�|nCʸ�^[��<C�\x�:�oS��=<9g�ԃ��#��6��rp�A�'.��a�
H���D1�0R������)7����ȥO^�+ɬ8�m�� G6a���)7Y�i�Cif�Ee�5���*�f�|T�l{����@i,sifN�z1e�� �I�x��8�)���X��%O,]�Slm���SH=�х�V�݄4����vIEXT�q#��͂~��l{ ��nH�6��j`aP��֕T���g�n�)�b�Յ=eO93����L��WV���k;C��tkO�P�jTi�i�T�K��z��NÆB9�ɖ�[��=�HA�p���#	� g�u�=(���HM�0��F�L�2�=װ�Ȓ����`ޤ0+�u�=��A
�/g�{M�5�Pڃ��2lwS���4�*��a�z��:� �6v,��j��#o�#��-��5�-�O׾F6��lKl:�?�?��n�.� ���:	9�� �^�9��o�mصo�B�U�������獵*C��=�m�m�ڷ�w��u�ֲ|°�,[��o����k�^��^"4�ѩ*�)���z�~�^��]��&�B<���Y�� c��JJ�?��W뼟�?�ڷ7���PTs���pٕ|�,,���~�=`׾�)e�5 �l��0�u��ْ�r�?��2t��0�k�^�i�� ��zZ��S��چ:x�~vgn|��}{��τ]��������2`QW����صSјk��=x�kdB)�D����X�'���Mjp��-��b����b����VӑO�Q���¹�����,fj-��pipK>��qv���������\��̄ۏO�fKL@�!:��(�yn��k�&{�V�W�"���m�b��C2(j˧l{����|`���2�S��aw�=�� c9w��]KصSM�}�V@�g���J��,�hC���������m/.&@�
�8'�ieur���B�s�]�7ى����87����Y��oe�~aׄv��T��Ua��e���V�:ৰm�~H���������$i�6Y�EVk"�j6��0�Q�'�������{�P��8�D��}����I
�}bW۱�O��q��.]�URV��p˫��H&�P�>�)o?-졸i�hq���"�
����*�Ş������ҟ^�[��2��˒��@2�e�q���:�薷B^r!oy�������*�%�,TH��u��n���M?��4z�er�T�u-����D��~��/O�˅=Е`b X<���0�Y-w�pNw�Q��x�U�Z�վ�5�C��c2�}���ȩ��<���ěP?�[Q yS{au8pu3��-���sj��)�'ޔ�{]э!�ۜN�hߤ���ٷ1f>�t��F�o�B#��Wvo��	o*�P0��f��=Ń�D����g�	�lCz�`��y2�m0����n��x�M����A�X��Ƃ+%�V|�y?����qƘ�I��^��\4�S��X�s�Q�o���ě�t�fP�
��ɲ�Nu+��r�Qw���O�z	w�P�e�f5���x�#�z��s���s�mO�����jN ��97�$�'���
1��O�����ě|	'�� ז��u�Z�d����.�~����'�4p�88��T�����c ���׈crT�Q���7�^�w��5H�-Lhi���䀤a�a�w%ad<�������������]�yƼ�� :ǹ��Yd<�&k~~�/z����cn.������~�=`<�s6X��[i�bq���84�%��<���;7O�IΪdW�HL�gF03��.e�"��l{�x�MN@y�Y"�X����R����Mg~a'�#�7��j\��%��,�C/饁l�o8dw&G��Z�]J��3\X�P�i4P;�;!�9k��ěn��rn%(s��8֩v�n��%�t�����tS��@t�����3I_F.�@@*�����;�8AJn�H�^f���3���b6����4�#�#;O� 7�x�u4���}����J�4��tK��'�VV���YV�E�:V�������=�|�gO�)켼���hF�&vx��X+pUV�*l�����m��x��w"����<�c���ң�Vv\��&7q�~>D`N���3{�Z�
5=���?m�����Zl��c�,e΅��t��P�?��� �3�{�;��*�'�OH�������]��~�4�ӂy���&G�]�����c-��c<F"Ȏ+3f)7q��o�������e�8~���QԼ㽌��M�w	,f +u�4X˸�No$�2ߎ�ò㰌!�M�+�2�ű�:��YS�Tx9�j=K�e�G�����r-J3��O�%�2��dp`b�|��u~��p����p^!C�N�|F�Ԍ`�+,s(�}��
fY�M|Իٔ��"l4�'_�����I�S�u�����h��R��6iX��nW�i������m`s�M|4j.���o� _�Q�� [1�I6q�����o� ���1��c�͸0X�=��4~k:��Qֺ�M|�j ᮐ7��4`��g1�GB���Q֠�M|FS[ 4��S�Y�?Mk�ąyڷem���G�YXɩ�lqx��U��ހ"%��'&�i�&>J<
�Z��Qp>�x���_����h���M/I���I։g�%�2ijI��r؝e��\�G�/�ff{�X0���:�Y�W�����4p��M�Ny�^ t3��x�%6j*�Q�C�9ib��s��\[h�2N1[��0��ld Fp��:[8m�&n�Z� |�^e�=���+���WW@v;p��מ��_OFψ�r���y�p��Gɸ츥�Ы�%hh�';[�*{|�|-���uB�㖞S�n�)Y�����;��)�O�PځCv��s��M�2G("�6kc�E��X;{���vt�-=����-��4����B�Y��,�C����D�)�7�D��� p&{-����b ��r���S�)�7�D`^�)�4���
7I�D�6�T����x��ЛxbT?:��q�}|�q 0ɖD0�������~�ЛxbLϷm�N��[�@�9��_�~v�6��^�k ����D�sI%Ϥ��s�z�)�7�D�i�gz���&��h|)B+�f��c�Ύ'zN��'�YӚ����/�u�x��^]�� �A��?�{n�o�U�8���:��p.c�ˎR����7ω=7��~%����8��u�,�X��vɩ?;��?�����ޓj��.m2̦��
f�2g�}�������D�7�9Nev��ը#��v���:[?���e]y ��r<�X簼 U  ����'P���;��?����d��}�u���-ÙM��S޶�������Y%&|&�����h�[���s~׎�yNﾉ��5}"03��cp���A*v�x�q���񐛮~�l7Y�垷�TN�򠫱���w�r���<�W]x
W"�9֘c�z2űLz`4��z���n��ĉ7��@�ىW�<�ж�Y��i��$̓����������z����t�B<���f��x/Xc:�������xآ:\�?��D<�9,
�ͱwn�����R��Hϸ�͜�V�h�6B�bN��
 =ev	�x{��n_�B<z31�3�3ɮ���GiY&���1j��Ľ[߹����x �*Nq/�;��V�{k�u�=���=p���`B3ۥ�h��T��׶F�Ňs?۟2�t���e�m�����=��h-m:O���x������' ]�}v'�p���|��^�񪛙^%7MK` Jzz&�����
ۂ�;�v�d��M�?�h�N���3���6\�
��ß��t�q���t��ANLZ���jY��jx$Α:���8r�x��<rpSǱ"�+�A�*������ANN^�{�=�U7M�L!�J�"�
ea?��&���l{�x�M�4�34�(���B���F`�::e7��g8ҍ?͸�L[�(�X�oE
<G8�g�\��W��\휀�|�#�X����A�G:���Nļ�oK�w�9���`�>�}��Gœ����������-����%��'c[�a����?��d�E�vTv]�W�W̘���z��k��}���ջ}S���Y�.7u�1eX��F�S����
`t�ۀ4�u�U���u�w�O��8�@�  A�dqD�K��k���e�fb�Ҙ6��@���el�i�i9�!����m%7uO� *�����/4�m��q��.8���|�;7��o}r@�r
�`f�n��+���sT��s�\{S��W;A���~��i� fE���QϷ��P�q�!P�3�����WS�����RJ;�����7À��T:L�`I@�̗�g
+V�_:���W���;�g����I���c0@���{4�g��f6��d9V�̧o7:��uh`
du�4��&	�<�ͫ$����t�W��08��9�|���{"gd���ۥ���TD���ڊ%f�Ħda���ǹm=e<�f^����eɡc���.L��a��jǔ�N$4��&�9A�b10��9D�|U�/"���!鲫n=��Mխu�,��[��8�6X�A�lh����j��������}6�J<L(K=AO�"�z����Po�+}�Ε*Es���� ��&����������Ͽ�;g�9����y��"W�N�A7 �u����/�O����w_�2hy�8�S-<s.82�����Wx�W�_�[��nHG��	�vr�:C5��;8�����_ϻn�__�q0����aNob洺��2l��=�Dj�߿�!� @���a�� �c�'{ۇ�`��0İ�s/���~�O��M=E��^��|]C��mX|�� `}���h�[��Ks)��D������B`Rp��s��u�G�1~�F��o��������      /     x���;nA���S"4���U��$��F$$� xI�H�H��
l�"�znD�"��jF�#�����Q�� u�A�P�(;�HMCI�+}��ݛ�9�_p�Y����5�6��.Q:�O�]J��u�n`�H��kUpix-.U�m�{g�A�mrbw���zj��?":�a�r�N�k j�9 Đ�uS���:R�>.#�X�O#Bp�A," �d�<�N>���ۇyx�Ο���_��<l��ö_��8��}RHY=��Vs�0 )Ŧ�9ֱx�c��A4��6��j'Pư�V{�A��M"�8fo}1�j`��m?��z}b�p���nǭU��& iA�
�A��f-��V��T+��U���.��t�M�8D� b&A��F�<�����N(�����m�Խ�n����(N"(f�C^�'��
B�`L�- ��뙭�_����}����H����?�����3�L	����Z��/�Q%�(��,��w�R����9����2�λc|~m�ü[�׫3���(>�_�v�?���      .   ^  x���[o�8ş��{d����4RC�@�-m �V��!�\�n����v՝�X��%��t|�ߢ�$ �1�D���t����q�҇�}�Cqm�mѰ=�^=�v�ǭ�=�ͼ�_�Av��^����<wN�j-�k'����0�����M3_o�������р"�k�C���h�1l#v�L�,F �
"+� �4e��]|@���-�s^=e=%��d���_ː�ټWŞ�����u�ft����kmZ�r�[�����	�T �C�&5"jrn!N�︐�i� ���y�1��G*�
�J�)��q�m���#��q���2#�]$^X�َ��Fd�l'��t� ؒs��n�����Zmb�n
A�7XL$㈑�� ���� 2��4CX��Q�_�k���I����)�4�=�SǙ�J{�F���n)�����"
7;s4�#���2}�̳�5&�^���w�_����@X�F��(`�X�P�2��i�a�L�W)��6Ӳ��G<�Yged�N`Қ�j��V®�U�=%�Ti�	v��.�3�*g�X�g��1�A2^{L	B�Ԥ�R�M��k#TEZ>di�-���qm=^@�t� �2�{��Ik�N�#��g��|�3��I ;�Í�oL|��������[�����u������f���c�v|����*���_N������8�N:R��d;�.�����S����n~�"��9�:�_��m��A� �ʺg���PRI�u��(��)����ߺ砻���1��t�ɵvzsN��m�2z���A��s���[��YN��{ֵ����G��y��MN�ේ�ռ���	"]��     
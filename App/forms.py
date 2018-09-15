from django import forms
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()


class LoginForm(forms.Form):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'class': 'form-control',
                'class': 'si',
                'placeholder': "아이디 또는 이메일",
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'class': 'si',
                'placeholder': "비밀번호",
            }
        )
    )

class RegisterForm(forms.Form):
    ID = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'class': 'si',
                'class': 'form-control',
                'placeholder': "아이디",
            }
        )
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'si',
                'class': 'form-control',
                'placeholder': "비밀번호 확인",
            }
        )
    )
    # 비번 체크
    password2 = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': "비밀번호 입력",
            }
        )
    )

    # 아이디 중복체크
    def clean_username(self):
        ID = self.cleaned_data['ID']
        if User.objects.filter(ID=ID).exists():
            raise forms.ValidationError('아이디가 이미 사용중입니다')
        return ID

    # 비번체크
    def clean_password2(self):
        password1 = self.cleaned_data['password1']
        password2 = self.cleaned_data['password2']
        if password1 != password2:
            raise forms.ValidationError('비밀번호가 일치하지 않습니다')
        return password2

    # 정보생성
    def signup(self):
        if self.is_valid():
            return User.objects.create_user(
                username=self.cleaned_data['ID'],
                password=self.cleaned_data['password2']
            )

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('user', 'content')
        widgets = {
        'user': forms.TextInput( attrs={
            'class': 'form-control',
            'class': 'inl',
            'placeholder': "글쓴이",
            }),
        'content': forms.Textarea( attrs={
            'class': 'form-control',
            'class': 'inl',
            'placeholder': "최대140글자까지만 입력해주세요",
            'rows': 8,
            'cols':66,
            }),
        }
